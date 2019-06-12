import * as React from "react";
import { style } from "typestyle";
import * as css from "csstips";

const styles = style({});

interface Props extends React.Props<{}> {}

export function {{pascalCase name}}({}: Props) {
  return <div data-test-id={ {{pascalCase name}}.ids.id} className={styles}>hello world</div>;
}

//{{pascalCase name}}.ids = ids("{{kebabCase name}}", {});