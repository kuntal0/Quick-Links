import * as React from 'react';
import styles from './KuntalQuickLinks.module.scss';
import { IKuntalQuickLinksProps } from './IKuntalQuickLinksProps';
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

// Step 1 - Create interface of list schema
interface ILinkItemSingle {
  Title: string;
  Link: {
    Url: string;
  };
  IsActive: boolean;
  Order0: number;
  Logo: string;
}


// Step 2 - Multiple items interface
interface ILinkItemMultiple {
  AllLinks: ILinkItemSingle[];
}


export default class KuntalQuickLinks extends React.Component<IKuntalQuickLinksProps, ILinkItemMultiple > {

  // Constructor
  constructor(props: IKuntalQuickLinksProps, state: ILinkItemMultiple) {
    super(props);
    this.state = {
      AllLinks: [],
    };
  }
  componentDidMount() {
    this.getAllEmployeeDetails();
  }

  public getAllEmployeeDetails = () => {
    let selectColumns = "ID,Title,RedirectURL,Order0,LinkImage";

    // Filter applied because we need to get Active links only from List
    let filterBy = `IsActive eq 1`;

    let listURL = `${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${this.props.listName}')/items?$select=${selectColumns}&$filter=${filterBy}&$orderby=Order0 asc`;

    console.log(listURL);
    this.props.context.spHttpClient
      .get(listURL, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        response.json().then((responseJSON: any) => {
          this.setState({
            AllLinks: responseJSON.value,
          });
          console.log(this.state.AllLinks);
        });
      });
  };

  public render(): React.ReactElement<IKuntalQuickLinksProps> {

    let selectedNumberOfColumns = parseInt(this.props.numberOfColumsToShow);

    let columnWidth: any;

    if (selectedNumberOfColumns == 4) {
      columnWidth = "23%";
    } else if (selectedNumberOfColumns == 3) {
      columnWidth = "32%";
    } else if (selectedNumberOfColumns == 2) {
      columnWidth = "48%";
    } else {
      columnWidth = "100%";
    }


    return (
      <div className={styles["cz-quick-links"]}>
        <p>{selectedNumberOfColumns}</p>

        {/* Component title */}
        <div>
          <p className={styles["component-title"]}>
            {this.props.componentTitle}
          </p>
        </div>

        {/* Empty Message */}
        <div
          style={{ display: this.state.AllLinks.length === 0 ? "" : "none" }}
        >
          <p>{this.props.emptyMessage}</p>
        </div>

        {/* Data */}
        <div className={styles["all-links-container"]}>
          {this.state.AllLinks.map((link) => {
            return (
              <div
                className={styles["quick-link-card"]}
                onClick={() => {
                  window.open(link.Link.Url, "_blank");
                }}
                style={{ width: columnWidth }}
              >
                <img
                  src={
                    link.Logo == null
                      ? require("./Images/help.png")
                      : window.location.origin +
                      JSON.parse(link.Logo).serverRelativeUrl
                  }
                  alt=""
                  className={styles["quick-link-image"]}
                />
                <p>{link.Title}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
