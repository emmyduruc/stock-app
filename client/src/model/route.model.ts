import { FunctionComponent } from "react";

export interface IRoute {
  path: string;
  exact?: boolean;
  component: FunctionComponent<any>;
  name: string;
  protected?: boolean;
}
