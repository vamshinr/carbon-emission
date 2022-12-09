
const {Builder, Browser, By, Key, until}=require("selenium-webdriver");
const assert=require("assert");
let chai=require("chai");
describe("HPT Tests",function(){

it("login to Admin page",async function(){
 let driver = await new Builder().forBrowser("MicrosoftEdge").build();
await driver.manage().window().maximize();
await driver.get("http://localhost:3000/login");

await driver.findElement(By.id("username")).sendKeys("admin@csus.edu");
await driver.findElement(By.id("password")).sendKeys("admin@123");
await driver.findElement(By.id("login")).click();
// assert check the correct battery page
let actualUrl="http://localhost:3000/admin";
let expectedUrl= await driver.getCurrentUrl();
assert.strictEqual(expectedUrl,actualUrl);
await driver.quit();

});
it("login to Battery page",async function(){
 let driver = await new Builder().forBrowser("MicrosoftEdge").build();

await driver.manage().window().maximize();
await driver.get("http://localhost:3000/login");

await driver.findElement(By.id("username")).sendKeys("battery@csus.edu");
await driver.findElement(By.id("password")).sendKeys("battery@123");
await driver.findElement(By.id("login")).click();
// assert check the correct battery page
let actualUrl="http://localhost:3000/battery-supplier";
let expectedUrl= await driver.getCurrentUrl();
assert.strictEqual(expectedUrl,actualUrl);
await driver.quit();

});
it("login to Motor page",async function(){
 let driver = await new Builder().forBrowser("MicrosoftEdge").build();

await driver.manage().window().maximize();
await driver.get("http://localhost:3000/login");

await driver.findElement(By.id("username")).sendKeys("motor@csus.edu");
await driver.findElement(By.id("password")).sendKeys("motor@123");
await driver.findElement(By.id("login")).click();
// assert check the correct battery page
let actualUrl="http://localhost:3000/motor-supplier";
let expectedUrl= await driver.getCurrentUrl();
assert.strictEqual(expectedUrl,actualUrl);
await driver.quit();

});
it("login to Ground Transport page",async function(){
 let driver = await new Builder().forBrowser("MicrosoftEdge").build();

await driver.manage().window().maximize();
await driver.get("http://localhost:3000/login");

await driver.findElement(By.id("username")).sendKeys("groundroute@csus.edu");
await driver.findElement(By.id("password")).sendKeys("ground@123");
await driver.findElement(By.id("login")).click();
// assert check the correct battery page
let actualUrl="http://localhost:3000/ground-transport";
let expectedUrl= await driver.getCurrentUrl();
assert.strictEqual(expectedUrl,actualUrl);
await driver.quit();
});
it("login to Sea Transport page",async function(){
 let driver = await new Builder().forBrowser("MicrosoftEdge").build();

await driver.manage().window().maximize();
await driver.get("http://localhost:3000/login");

await driver.findElement(By.id("username")).sendKeys("searoute@csus.edu");
await driver.findElement(By.id("password")).sendKeys("sea@123");
await driver.findElement(By.id("login")).click();
// assert check the correct battery page
let actualUrl="http://localhost:3000/sea-transport";
let expectedUrl= await driver.getCurrentUrl();
assert.strictEqual(expectedUrl,actualUrl);
await driver.quit();
});
it("login to battery page with wrong username",async function(){
 let driver = await new Builder().forBrowser("MicrosoftEdge").build();
 //await driver.switchTo().newWindow('tab');

await driver.manage().window().maximize();
await driver.get("http://localhost:3000/login");

await driver.findElement(By.id("username")).sendKeys("admin");
await driver.findElement(By.id("password")).sendKeys("battery@123");
await driver.findElement(By.id("login")).click();
// assert check the correct battery page
let actualUrl="http://localhost:3000/battery-supplier";
let expectedUrl= await driver.getCurrentUrl();
assert.strictEqual(expectedUrl,actualUrl);
await driver.quit();


});

it("Search tool with a correct id",async function(){
 let driver = await new Builder().forBrowser("MicrosoftEdge").build();

await driver.manage().window().maximize();
await driver.get("http://localhost:3000/dashboard");
//search for a tool by ID
await driver.findElement(By.id("hpt-sno-search-text")).sendKeys("511");
await driver.findElement(By.id("search")).click();
await driver.sleep(4000);
let Did=await driver.findElement(By.id("tool-title-id")).getText();

// compare the entered id with retrieved id number
chai.assert.include(Did,"511");
await driver.quit();

});

it("Search tool with false tool ID",async function(){
 let driver = await new Builder().forBrowser("MicrosoftEdge").build();
await driver.manage().window().maximize();
await driver.get("http://localhost:3000/dashboard");
//search for a tool by ID
await driver.findElement(By.id("hpt-sno-search-text")).sendKeys("00");
await driver.findElement(By.id("search")).click();
await driver.sleep(4000);
let alert=await driver.findElement(By.xpath("/html/body/div/div[1]/div/div[2]")).getText();
//test that the displayed message contains Failure
chai.assert.include(alert,"Failure");

await driver.quit();

});

});
