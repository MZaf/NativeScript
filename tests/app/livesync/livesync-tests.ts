// >> article-require-page-module
import { Page, ShownModallyData, NavigatedData } from "tns-core-modules/ui/page";
// FrameModule is needed in order to have an option to navigate to the new page.
import { topmost, NavigationEntry } from "tns-core-modules/ui/frame";
// << article-require-page-module

// TODO: Remove this and get it from global to decouple builder for angular
import { createViewFromEntry } from "tns-core-modules/ui/builder";

// >> article-set-bindingcontext
function pageLoaded(args) {
    const page = args.object;
    page.bindingContext = { name: "Some name" };
}
exports.pageLoaded = pageLoaded;
// << article-set-bindingcontext
import * as TKUnit from "../TKUnit";
import * as helper from "../ui/helper";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { View, PercentLength, unsetValue, EventData, isIOS } from "tns-core-modules/ui/core/view";
import { Frame, stack } from "tns-core-modules/ui/frame";
import { Label } from "tns-core-modules/ui/label";
import { Color } from "tns-core-modules/color";
import { TabView, TabViewItem } from "tns-core-modules/ui/tab-view/tab-view";
import { _resetRootView } from "tns-core-modules/application";
import { Button } from "tns-core-modules/ui/button/button";

export function test_livesync() {
    console.log("--> start");
    let page0;
    let page1;
    let forwardCounter = 0;
    let backCounter = 0;

    const navigatingEventHandler = (args: NavigatedData) => {
        if (args.isBackNavigation) {
            backCounter++;
        } else {
            forwardCounter++;
        }
    }

    const pageFactory0 = function (): Page {
        page0 = new Page();
        page0.id = "page0";
        page0.on(Page.navigatingToEvent, navigatingEventHandler);
        return page0;
    };

    const pageFactory1 = function (): Page {
        page1 = new Page();
        page1.id = "page1";
        page1.on(Page.navigatingToEvent, navigatingEventHandler);
        return page1;
    };

    helper.navigateWithHistory(pageFactory0);
    helper.navigateWithHistory(pageFactory1);

    // helper.goBack();
    // global.__onLiveSync();

    TKUnit.assertEqual(forwardCounter, 2, "Forward navigation counter should be 2");
    TKUnit.assertEqual(backCounter, 0, "Backward navigation counter should be 1");
    // page0.off(Page.navigatedToEvent, navigatingEventHandler);
    // page1.off(Page.navigatedToEvent, navigatingEventHandler);

    // helper.goBack();
}
