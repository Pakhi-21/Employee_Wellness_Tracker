package com.company.ewt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.company.ewt.entity.SurveyResponse;

import java.util.*;


@Repository
public interface SurveyResponseRepository extends JpaRepository<SurveyResponse, Long> {
    List<SurveyResponse> findByEmployeeId(Long employeeId);
    List<SurveyResponse> findBySurveyId(Long surveyId);
}