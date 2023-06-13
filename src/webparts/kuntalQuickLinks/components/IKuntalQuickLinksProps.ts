import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IKuntalQuickLinksProps {
  //
  siteurl: string;
  context: WebPartContext;
  listName: string;
  emptyMessage: string;
  componentTitle: string;

  numberOfColumsToShow: any;
}
