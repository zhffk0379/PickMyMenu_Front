import React from "react";
import "./RankSurveyBar.css";

const RankSurveyBar = ({ data }) => {
  return (
    <div className="rank-survey-container">
      <h4 className="text-center mb-4">설문 결과 순위</h4>
      {data.map((item) => {
        const percentage0 =
          (item.question0Count / item.totalCount) * 100 || 0; // 0번 선택지 비율
        const percentage1 =
          (item.question1Count / item.totalCount) * 100 || 0; // 1번 선택지 비율

        return (
          <div key={item.choiceId} className="rank-survey-bar mb-3">
            <div className="rank-survey-question">
              <span className="left-text">{item.question0}</span>
              <span className="right-text">{item.question1}</span>
            </div>
            <div className="bar">
              <div
                className="bar-section bar-section-0"
                style={{ width: `${percentage0}%` }}
              >
                {/* 막대 안에 퍼센트 값 표시, 흰색으로 표시 */}
                {percentage0 > 0 && (
                  <span className="percentage-text">{Math.round(percentage0)}%</span>
                )}
              </div>
              <div
                className="bar-section bar-section-1"
                style={{ width: `${percentage1}%` }}
              >
                {/* 막대 안에 퍼센트 값 표시, 흰색으로 표시 */}
                {percentage1 > 0 && (
                  <span className="percentage-text">{Math.round(percentage1)}%</span>
                )}
              </div>
            </div>
            <div className="rank-survey-stats">
              <span>{item.question0Count}</span>
              <span>{item.question1Count}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RankSurveyBar;
