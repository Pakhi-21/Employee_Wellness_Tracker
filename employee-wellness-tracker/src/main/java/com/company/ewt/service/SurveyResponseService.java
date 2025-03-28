package com.company.ewt.service;

import java.time.Duration;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.ewt.entity.Employee;
import com.company.ewt.entity.Survey;
import com.company.ewt.entity.SurveyResponse;
import com.company.ewt.repository.EmployeeRepository;
import com.company.ewt.repository.SurveyRepository;
import com.company.ewt.repository.SurveyResponseRepository;

import java.util.List;
import java.util.Optional;

@Service
public class SurveyResponseService {
    @Autowired
    private SurveyResponseRepository responseRepository;
    
    @Autowired
    private SurveyRepository surveyRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public SurveyResponse submitResponse(Long employeeId, Long surveyId, String responses) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(() -> new RuntimeException("Employee not found"));
        Survey survey = surveyRepository.findById(surveyId).orElseThrow(() -> new RuntimeException("Survey not found"));

        // Check if the employee has already submitted a response for this survey
        List<SurveyResponse> existingResponses = responseRepository.findByEmployeeId(employeeId);
        boolean alreadySubmitted = existingResponses.stream()
            .anyMatch(resp -> resp.getSurvey().getId().equals(surveyId));

        if (alreadySubmitted) {
        throw new RuntimeException("You have already submitted this survey.");
        }

        SurveyResponse response = new SurveyResponse();
        response.setEmployee(employee);
        response.setSurvey(survey);
        response.setResponses(responses);
        response.setSubmittedAt(LocalDateTime.now());

        return responseRepository.save(response);
    }

    public List<SurveyResponse> getEmployeeResponses(Long employeeId) {
        return responseRepository.findByEmployeeId(employeeId);
    }

    public Optional<SurveyResponse> getResponseById(Long responseId) {
        return responseRepository.findById(responseId);
    }

    public SurveyResponse getSurveyResponseById(Long responseId) {
        return responseRepository.findById(responseId).orElse(null);
    }

    public SurveyResponse updateResponse(Long responseId, String newResponses) {
        SurveyResponse response = responseRepository.findById(responseId)
                .orElseThrow(() -> new RuntimeException("Response not found"));

        // Allow update only within 24 hours
        if (response.getSubmittedAt().plusHours(24).isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Editing time limit exceeded (24 hours).");
        }

        response.setResponses(newResponses.trim());
        System.out.println("Updating responses to: " + newResponses);
        response.setLastUpdatedAt(LocalDateTime.now());
        return responseRepository.save(response);
    }

    public String deleteResponse(Long responseId) {

        Optional<SurveyResponse> response = responseRepository.findById(responseId);
        
        if (response.isPresent()) {
            LocalDateTime submittedAt = response.get().getSubmittedAt();
            LocalDateTime now = LocalDateTime.now();
            
            // Check if the response is older than 24 hours
            if (Duration.between(submittedAt, now).toHours() > 24) {
                return "Deletion time limit exceeded (24 hours).";
            }

            responseRepository.deleteById(responseId);
            return "Survey response deleted successfully.";
        } else {
            return "Survey response not found.";
        }
       
    }
}
