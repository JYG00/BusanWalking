import React from "react";
import styles from "./hover_content.module.css";

interface HoverContentProps {
  keyWord: string;
  isScroll: boolean;
}

interface HoverContentState {
  positionTop: string;
}

// Hover Content
export default class HoverContent extends React.Component<HoverContentProps> {
  state: HoverContentState = {
    positionTop: "140px",
  };

  componentDidUpdate(prevProps: HoverContentProps) {
    if (this.props.isScroll !== prevProps.isScroll) {
      if (this.props.isScroll) {
        this.setState({ positionTop: "100px" });
      } else {
        this.setState({ positionTop: "140px" });
      }
    }
  }

  render(): React.ReactNode {
    return (
      <div
        className={styles.head_in_hover}
        style={{ top: this.state.positionTop }}
      >
        {/* 크기를 맞추기 위한 빈 태그 */}
        <div className={styles.head_logo_hover}>{this.props.keyWord}</div>
        {/* 헤더 hover 컨텐츠 */}
        <div className={styles.head_content_hover}>
          <div className={styles.head_content_in_hover}>
            {(() => {
              switch (this.props.keyWord) {
                case "관광지": {
                  return (
                    <div className={styles.head_hover_container}>
                      <div className={styles.head_hover_on}>
                        <div></div>
                        <p>전체관광지</p>
                      </div>
                      <div>
                        <div></div>
                        <p>숲길</p>
                      </div>
                      <div>
                        <div></div>
                        <p>해안길</p>
                      </div>
                      <div>
                        <div></div>
                        <p>도심길</p>
                      </div>
                    </div>
                  );
                }
                case "참여마당": {
                  return (
                    <div className={styles.head_hover_container}>
                      <div>
                        <div></div>
                        <p>명소공유</p>
                      </div>
                      <div className={styles.head_hover_on}>
                        <div></div>
                        <p>Q&A</p>
                      </div>
                    </div>
                  );
                }
                case "문의": {
                  return (
                    <div className={styles.head_hover_container}>
                      <div>
                        <div></div>
                        <p>이용문의</p>
                      </div>
                      <div>
                        <div></div>
                        <p>관광불편신고</p>
                      </div>
                      <div className={styles.head_hover_on}>
                        <div style={{ opacity: 0 }}></div>
                        <p style={{ opacity: 0 }}>..</p>
                      </div>
                    </div>
                  );
                }
                default: {
                  return <div></div>;
                }
              }
            })()}
          </div>
        </div>
      </div>
    );
  }
}
