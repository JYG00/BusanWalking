import React, { Component } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import styles from './menu_content.module.css';

// Header > MenuContent props, state
interface MenuContentProps {
  title: string;
  content: string[];
}
interface MenuContentState {
  isDisplay: boolean;
}
// 메뉴 콘텐츠
export default class MenuContent extends Component<MenuContentProps, MenuContentState> {
  constructor(props: MenuContentProps) {
    super(props);
    this.state = {
      isDisplay: true,
    };
  }

  render() {
    let i: number;
    i = 0;

    const contentRef = React.createRef<HTMLDivElement>();

    return (
      <div className={styles.container}>
        <div>
          {/* 메뉴 이름 */}
          <div
            className={styles.head_menu_title}
            // 타이틀을 클릭하면 메뉴확장
            // 다시 누르면 축소
            onClick={() => {
              if (contentRef.current !== null) {
                if (this.state.isDisplay) {
                  contentRef.current!.style.display = 'block';
                } else {
                  contentRef.current!.style.display = 'none';
                }
                this.setState({ isDisplay: !this.state.isDisplay });
              }
            }}
          >
            <h2>{this.props.title}</h2>
            <i>
              <IoIosArrowDown style={{ fill: 'white' }} />
            </i>
          </div>
          {/* 메뉴 상세 내용 */}
          <div className={styles.head_menu_sub} ref={contentRef}>
            {this.props.content.map((content) => (
              <div key={i++}>
                <div></div>
                <p>{content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
