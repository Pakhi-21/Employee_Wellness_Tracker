package com.company.ewt.entity;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;



@Entity
@Getter 
@Setter 
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "surveyReponse")
public class SurveyResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee; 

    @ManyToOne
    @JoinColumn(name = "survey_id", nullable = false)
    private Survey survey;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String responses;  // Store responses as a JSON or comma-separated string

    @Column(nullable = false, updatable = false)
    private LocalDateTime submittedAt;

    @Column(nullable = true)
    private LocalDateTime lastUpdatedAt;

}
