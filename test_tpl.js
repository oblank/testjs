/**
 * Created by oBlank on 3/31/16.
 */
"use strict";

const genMenu = require("./tpl");
var appendMenu = () => {
    let links = {
        url : "http://web.tuishiben.com",
        title: "test"
    }
    let menu_html = genMenu(links);

    console.log(menu_html);
};

appendMenu();