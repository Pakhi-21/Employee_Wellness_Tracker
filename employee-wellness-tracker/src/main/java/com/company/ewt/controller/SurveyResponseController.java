package com.company.ewt.controller;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.company.ewt.dto.SurveyResponseRequest;
import com.company.ewt.entity.SurveyResponse;
import com.company.ewt.service.SurveyResponseService;

@RestController
@RequestMapping("/api/responses")
public class SurveyResponseController {
    @Autowired
    private SurveyResponseService responseService;
    
    // post api for submiting response
    @PostMapping("/submit")
    public ResponseEntity<SurveyResponse> submitResponse(@RequestBody SurveyResponseRequest request) {
    return ResponseEntity.ok(responseService.submitResponse(request.getEmployeeId(), request.getSurveyId(), request.getResponses()));
    }
    
    // get user submit reponse
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<SurveyResponse>> getEmployeeResponses(@PathVariable Long employeeId) {
        return ResponseEntity.ok(responseService.getEmployeeResponses(employeeId));
    }
    
    //get response from id
    @GetMapping("/{responseId}")
    public ResponseEntity<?> getSurveyResponseById(@PathVariable Long responseId) {
        SurveyResponse response = responseService.getSurveyResponseById(responseId);
    
        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Survey response not found.");
        }
    }

    //for updation checking
    @GetMapping("check/{responseId}")
    public ResponseEntity<?> checkEditPermission(@PathVariable Long responseId) {
    try {
        SurveyResponse response = responseService.getSurveyResponseById(responseId);

        // Check if 24 hours have passed
        if (response.getSubmittedAt().plusHours(24).isBefore(LocalDateTime.now())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("message", "Editing time limit exceeded (24 hours)."));
        }

        return ResponseEntity.ok(response);
    } catch (RuntimeException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", e.getMessage()));
    }
   }

    // for updating submit response
    @PutMapping("/{responseId}")
    public ResponseEntity<SurveyResponse> updateResponse(@PathVariable Long responseId, @RequestBody SurveyResponseRequest newResponses) {
        return ResponseEntity.ok(responseService.updateResponse(responseId, newResponses.getResponses()));
    }
    
    //delete response in specific time
    @DeleteMapping("/{responseId}")
    public ResponseEntity<String> deleteResponse(@PathVariable Long responseId) {
        String result = responseService.deleteResponse(responseId);
        
        if (result.equals("Survey response deleted successfully.")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(result);
        }
    }
}
