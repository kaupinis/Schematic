// eo_service2.js  schematic_mobile version

class Service {
    constructor(base) {
        this.baseURL = base;
        this.capabilities = "readonly";
    }
    
    login() {
        
    }
    
    checkLogin() {
    }
    
    getProjectsList() {
        let u = this.baseURL + "projects.json";
        report("Service getProjectsList " + u);
        let p = getJSONData(u);
        return (p);
    }
        
    getProjectFilesList(proj) {
        let u = proj;
        u = PROJECT_LIB + "files.json";
        report("Service getProjectFilesList " + u);
        let p = getJSONData(u);
        return (p);
    }
    
    getProjectLibrariesList(proj) {
        let u = proj;
        u = PROJECT_LIB + "libraries.json";
        report("Service getProjectLibrariesList " + u);
        let p = getJSONData(u);        
        return (p);
    }
    
    openFile(link) {
        let u = link;
        report("Service openFile " + u);
        return(getData(u));
    }

    saveFile(proj, link, filename, data) {
        let r = fetch(link, {method: "POST", 
            body: new URLSearchParams({filename: filename, data: data})
        });
        return(r);
    }
}


function getData(u)
{
    let p = new Promise(function (resolve, reject) {
        let p1 = fetch(u).then(function (response) {
            report("24 u = " + u);
            if (!response.ok)
                reject("25 " + response.status);
            else if (u.indexOf(".json") != -1) {
                resolve(response.json());
            }
            else
                resolve(response.text());
        }).catch(function (error) {
            reject(error);
        });
    });
    return (p);
}

function getTextData(u)
{
    let p = new Promise(function (resolve, reject) {
        let p1 = fetch(u).then(function (response) {
            report("24 u = " + u);
            if (!response.ok)
                reject("25 " + response.status);
            else
                resolve(response.text());
        }).catch(function (error) {
            reject(error);
        });
    });
    return (p);
}
   
function getJSONData(u)
{
    let p = new Promise(function (resolve, reject) {
        let p1 = fetch(u).then(function (response) {
            report("24 u = " + u);
            if (!response.ok)
                reject("25 " + response.status);
            else  {
                resolve(response.json());
            }
        }).catch(function (error) {
            reject(error);
        });
    });
    return (p);
}

function getResponseData(u)
{
    let p = new Promise(function (resolve, reject) {
        let p1 = fetch(u).then(function (response) {
            report("24 u = " + u);
            if (!response.ok)
                reject("25 " + response.status);
            else
                resolve(response);
        }).catch(function (error) {
            reject(error);
        });
    });
    return (p);
}


let RssRequest = null;
let FileRequest = null;
let FileLink = null;
let SchematicMode = false;
let SaveRequest = null;

function getService(baseURL) {
    report("getService " + baseURL);
    let servic = new Service(baseURL);
    return (servic);
}



function getLocalSymbol(name) {
    let fp = new FileParser(name);
    let s = localStorage.getItem(name);
    if (s != null) {
        let d = fp.parse1(s);
        if (d != null) {
            sheet.selectedObject = d;
            sheet.setState(STATE_PLACING);
        }
    }
}
