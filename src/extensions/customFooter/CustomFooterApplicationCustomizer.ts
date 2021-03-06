import * as React from 'react';
import * as ReactDom from 'react-dom';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
BaseApplicationCustomizer,
PlaceholderContent,
PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';
import * as strings from 'CustomFooterApplicationCustomizerStrings';
import CustomFooter from './components/CustomFooter';
import CustomHeader from './components/CustomHeader';
require('bootstrap');

const LOG_SOURCE: string = 'CustomFooterApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ICustomFooterApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class CustomFooterApplicationCustomizer
  extends BaseApplicationCustomizer<ICustomFooterApplicationCustomizerProperties> {

    private _bottomPlaceholder: PlaceholderContent | undefined;
    private _topPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    let message: string = this.properties.testMessage;
    if (!message) {
    message = '(No properties were provided.)';
    }
    // Call render method for rendering the needed html elements
    this._renderPlaceHolders();
    return Promise.resolve();
  }

  private _renderPlaceHolders(): void {
    let cssURL = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
    SPComponentLoader.loadCss(cssURL);
    // Handling the bottom placeholder
    if (!this._bottomPlaceholder) {
    this._bottomPlaceholder =
        this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Bottom);
    // The extension should not assume that the expected placeholder is available.
    if (!this._bottomPlaceholder) {
        console.error('The expected placeholder (Bottom) was not found.');
        return;
    }
    const element: React.ReactElement<{}> = React.createElement(CustomFooter);
    ReactDom.render(element, this._bottomPlaceholder.domElement);
    }
     // Handling the top placeholder
     if (!this._topPlaceholder) {
      this._topPlaceholder =
          this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Top);
      // The extension should not assume that the expected placeholder is available.
      if (!this._topPlaceholder) {
          console.error('The expected placeholder (Bottom) was not found.');
          return;
      }
      const element: React.ReactElement<{}> = React.createElement(CustomHeader);
      ReactDom.render(element, this._topPlaceholder.domElement);
    }
  }
}
