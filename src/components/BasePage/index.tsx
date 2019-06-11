import React, { PureComponent } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import styles from './index.less';

export interface PageProps {
  title?: String;
  canBack?: boolean;
  leftContent?: any;
  rightContent: any;
  onLeftClick: () => void;

}
export default class BasePage extends PureComponent<PageProps>{
  render() {
    return (
      <div className={styles.page}>
        <NavBar
          className={styles.navbar}
          // icon={<Icon type="left" />}
          leftContent={
            this.props.leftContent || (
              <div>
                {this.props.canBack && (
                  <Icon
                    style={{ marginLeft: '-0.1rem' }}
                    type={'left'}
                    onClick={() => this.props.onLeftClick && this.props.onLeftClick()}
                    size="lg"
                  />
                )}
              </div>
            )
          }
          rightContent={this.props.rightContent || ''}
        >
          {this.props.title || ''}
        </NavBar>
        {this.props.children}
      </div>
    )
  }
} 