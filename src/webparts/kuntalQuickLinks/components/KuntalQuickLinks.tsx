import * as React from 'react';
import styles from './KuntalQuickLinks.module.scss';
import { IKuntalQuickLinksProps } from './IKuntalQuickLinksProps';
console.log(this.props.site)



export default class KuntalQuickLinks extends React.Component<IKuntalQuickLinksProps, {}> {
  public render(): React.ReactElement<IKuntalQuickLinksProps> {
    

    return (
      <div>
        <h1 className={styles.First}>kuntal Quick Links</h1>
        <h1>kuntal Quick Links</h1>
        <h1 className={styles.Second}> What am i doing??</h1>
        <h1 id="two">testing</h1>

      </div>
    );
  }
}
