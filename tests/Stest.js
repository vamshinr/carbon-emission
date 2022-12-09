const {Builder, Browser, By, Key, until}=require("selenium-webdriver");
const assert=require("assert");
let chai=require("chai");
describe("HPT Tests",function(){

it("Add a new tool",async function(){
let driver = await new Builder().forBrowser("MicrosoftEdge").build();
await driver.manage().window().maximize();
await driver.get("http://localhost:3000/admin");
//click New Tool button
await driver.findElement(By.id("NewTool")).click();

await driver.findElement(By.id("serialNumber")).sendKeys("514");
//tool type
await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div/div[1]/form/div[3]/div/div/div/div/button")).click();
//await driver.sleep(1000);
await driver.findElement(By.xpath("//li[@id='toolTypeID-option-0']")).click();
//battery
await driver.sleep(2000);
await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div/div[1]/form/div[4]/div/div/div/div/button")).click();
//battery option
await driver.findElement(By.xpath("//li[@id='batteryID-option-0']")).click();
//Motor
await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div/div[1]/form/div[5]/div/div/div/div/button")).click();
//motor option
await driver.findElement(By.xpath("//li[@id='motorID-option-0']")).click();
//Sea rout
await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div/div[1]/form/div[6]/div/div/div/div/button")).click();
//Sea rout option
await driver.findElement(By.xpath("//li[@id='seaRouteID-option-1']")).click();
//Ground
await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div/div[1]/form/div[7]/div/div/div/div/button")).click();
//Sea rout option
await driver.findElement(By.xpath("//li[@id='groundRouteID-option-0']")).click();
//submit
await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div/div[2]/button[2]")).click();
await driver.sleep(1000);
//show confirmation message
let alert=await driver.findElement(By.xpath("//*[@id='root']/div[1]/div/div[2]")).getText();
chai.assert.include(alert,"Success");
await driver.quit();
});

//Edit tool information

it("Edit Tool information",async function(){
 let driver = await new Builder().forBrowser("MicrosoftEdge").build();
await driver.manage().window().maximize();
await driver.sleep(4000);
await driver.get("http://localhost:3000/admin");
//Edit part number
await driver.sleep(4000);
//select edit icon
await driver.findElement(By.xpath("/html/body/div/div[1]/div[2]/table/tbody/tr[4]/td[22]/button[1]")).click();
// edit serial number
await driver.findElement(By.id("serialNumber")).sendKeys("515");
await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div/div[2]/button[2]")).click();
await driver.sleep(4000);
let alert=await driver.findElement(By.xpath("/html/body/div/div[1]/div[2]/div/div[2]")).getText();
//search for confirmation message
chai.assert.include(alert,"Success");
await driver.quit();
});

it("Delete a Tool ",async function(){
let driver = await new Builder().forBrowser("MicrosoftEdge").build();
await driver.manage().window().maximize();
await driver.get("http://localhost:3000/admin");
await driver.sleep(4000);
//delete
await driver.findElement(By.xpath("/html/body/div/div[1]/div[2]/table/tbody/tr[4]/td[22]/button[2]")).click();
//await driver.sleep(4000);
//let alert=await driver.findElement(By.xpath("/html/body/div/div[1]/div[2]/div/div[2]")).getText();
//search for confirmation message
//chai.assert.include(alert,"Success");
await driver.quit();
});

//____Battery___

it("Add a new Battery",async function(){
let driver = await new Builder().forBrowser("MicrosoftEdge").build();
await driver.manage().window().maximize();
await driver.get("http://localhost:3000/battery-supplier");
//click New Battery button
await driver.findElement(By.id("newBattery")).click();
//Add a new battery
await driver.findElement(By.id("serialNumber")).sendKeys("114");
await driver.findElement(By.id("partNumber")).sendKeys("5");
await driver.findElement(By.id("co2")).sendKeys("20");
await driver.findElement(By.id("costManufactured")).sendKeys("60");
await driver.findElement(By.id("dateManufactured")).sendKeys("12012022");
await driver.findElement(By.id("salesPrice")).sendKeys("55");
await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div/div[2]/button[2]")).click();
await driver.sleep(1000);
let alert=await driver.findElement(By.xpath("//*[@id='root']/div[1]/div/div[2]")).getText();
chai.assert.include(alert,"Success");

await driver.quit();

});

it("Edit Battery information",async function(){
 let driver = await new Builder().forBrowser("MicrosoftEdge").build();
await driver.manage().window().maximize();
await driver.sleep(4000);
await driver.get("http://localhost:3000/battery-supplier");
//Edit part number
await driver.sleep(4000);
await driver.findElement(By.xpath("/html/body/div/div[1]/div[2]/table/tbody/tr[4]/td[22]/button[1]")).click();
//await driver.findElement(By.id("edit")).click();
await driver.findElement(By.id("partNumber")).sendKeys("0");
await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div/div[2]/button[2]")).click();
await driver.sleep(4000);
let alert=await driver.findElement(By.xpath("/html/body/div/div[1]/div[2]/div/div[2]")).getText();
//search for confirmation message
chai.assert.include(alert,"Success");
await driver.quit();

});
it("Delete Battery information",async function(){
let driver = await new Builder().forBrowser("MicrosoftEdge").build();
await driver.manage().window().maximize();
await driver.get("http://localhost:3000/battery-supplier");
await driver.sleep(4000);
//delete
await driver.findElement(By.xpath("/html/body/div/div[1]/div[2]/table/tbody/tr[4]/td[22]/button[2]")).click();
await driver.sleep(4000);
let alert=await driver.findElement(By.xpath("/html/body/div/div[1]/div[2]/div/div[2]")).getText();
//search for confirmation message
chai.assert.include(alert,"Success");
await driver.quit();
});

it("Show battery History",async function(){
 let driver = await new Builder().forBrowser("MicrosoftEdge").build();
await driver.manage().window().maximize();
await driver.get("http://localhost:3000/battery-supplier");
await driver.sleep(3000);
await driver.findElement(By.xpath("//*[@id='root']/div[1]/div[1]/div[2]/div/button[1]")).click();
await driver.sleep(2000);
let text=await driver.findElement(By.xpath("//*[@id=':r3:']")).getText();
//search for confirmation message
chai.assert.include(text,"Battery History");
await driver.quit();

});

//______Motor____

it("Add a new Motor",async function(){
let driver = await new Builder().forBrowser("MicrosoftEdge").build();
await driver.manage().window().maximize();
await driver.get("http://localhost:3000/motor-supplier");
//click New Motor button
await driver.findElement(By.xpath("//*[@id='root']/div[1]/div[1]/div[2]/button[2]")).click();
//Add a new Motor
await driver.findElement(By.id("serialNumber")).sendKeys("213");
await driver.findElement(By.id("partNumber")).sendKeys("22");
await driver.findElement(By.id("co2")).sendKeys("20");
await driver.findElement(By.id("costManufactured")).sendKeys("60");
await driver.findElement(By.id("dateManufactured")).sendKeys("12022022");
await driver.findElement(By.id("salesPrice")).sendKeys("55");
await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div/div[2]/button[2]")).click();
await driver.sleep(1000);
let alert=await driver.findElement(By.xpath("//*[@id='root']/div[1]/div/div[2]")).getText();
chai.assert.include(alert,"Success");
await driver.quit();
});

it("Edit Motor information",async function(){
let driver = await new Builder().forBrowser("MicrosoftEdge").build();
await driver.manage().window().maximize();
await driver.sleep(4000);
await driver.get("http://localhost:3000/motor-supplier");
await driver.sleep(4000);
//Edit part number
await driver.findElement(By.xpath("/html/body/div/div[1]/div[2]/table/tbody/tr[4]/td[22]/button[1]")).click();
await driver.findElement(By.id("partNumber")).sendKeys("0");
await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div/div[2]/button[2]")).click();
await driver.sleep(4000);
let alert=await driver.findElement(By.xpath("/html/body/div/div[1]/div[2]/div/div[2]")).getText();
//search for confirmation message
chai.assert.include(alert,"Success");
await driver.quit();

});

it("Delete Motor information",async function(){
 let driver = await new Builder().forBrowser("MicrosoftEdge").build();
await driver.manage().window().maximize();
await driver.get("http://localhost:3000/motor-supplier");
await driver.sleep(4000);
//delete
await driver.findElement(By.xpath("/html/body/div/div[1]/div[2]/table/tbody/tr[4]/td[22]/button[2]")).click();
//await driver.sleep(4000);
let alert=await driver.findElement(By.xpath("//*[@id='root']/div[1]/div/div[2]")).getText();
//search for confirmation message
chai.assert.include(alert,"Success");
await driver.quit();
});

it("Show Motor History",async function(){
 let driver = await new Builder().forBrowser("MicrosoftEdge").build();
await driver.manage().window().maximize();
await driver.get("http://localhost:3000/motor-supplier");
await driver.sleep(3000);
await driver.findElement(By.xpath("//*[@id='root']/div[1]/div[1]/div[2]/button[1]")).click();
await driver.sleep(1000);
let text=await driver.findElement(By.xpath("//*[@id=':r3:']")).getText();
//search for confirmation message
chai.assert.include(text,"Motor History");

await driver.quit();
});

//______Sea____

it("Add a new Sea transport",async function(){
let driver = await new Builder().forBrowser("MicrosoftEdge").build();
await driver.manage().window().maximize();
await driver.get("http://localhost:3000/sea-transport");
//click New Route button
await driver.findElement(By.xpath("//*[@id='root']/div[1]/div[1]/div[2]/button[2]")).click();
//Add a new Route
await driver.findElement(By.id("trackNumber")).sendKeys("314");
await driver.findElement(By.id("routeID")).sendKeys("3");
await driver.findElement(By.id("co2")).sendKeys("20");
await driver.findElement(By.id("shipID")).sendKeys("31114");
await driver.findElement(By.id("fuelCost")).sendKeys("70");
await driver.findElement(By.id("laborCost")).sendKeys("100");
await driver.findElement(By.id("custCost")).sendKeys("100");
await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div/div[2]/button[2]")).click();
await driver.sleep(1000);
let alert=await driver.findElement(By.xpath("//*[@id='root']/div[1]/div/div[2]")).getText();
chai.assert.include(alert,"Success");
await driver.quit();
});

it("Edit Sea Route Details",async function(){
 let driver = await new Builder().forBrowser("MicrosoftEdge").build();
await driver.manage().window().maximize();
await driver.sleep(4000);
await driver.get("http://localhost:3000/sea-transport");
await driver.sleep(3000);
//Edit part number
await driver.findElement(By.xpath("/html/body/div/div[1]/div[2]/table/tbody/tr[4]/td[22]/button[1]")).click();
await driver.findElement(By.id("fuelCost")).sendKeys("0");
await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div/div[2]/button[2]")).click();
await driver.sleep(3000);
let alert=await driver.findElement(By.xpath("/html/body/div/div[1]/div[2]/div/div[2]")).getText();
//search for confirmation message
chai.assert.include(alert,"Success");

await driver.quit();

});

it("Delete Sea Route Details",async function(){
 let driver = await new Builder().forBrowser("MicrosoftEdge").build();
await driver.manage().window().maximize();
await driver.get("http://localhost:3000/sea-transport");
await driver.sleep(3000);
//delete
await driver.findElement(By.xpath("/html/body/div/div[1]/div[2]/table/tbody/tr[4]/td[22]/button[2]")).click();
await driver.sleep(3000);
let alert=await driver.findElement(By.xpath("/html/body/div/div[1]/div[2]/div/div[2]")).getText();
//search for confirmation message
chai.assert.include(alert,"Success");
await driver.quit();
});

it("Show Sea Transport History",async function(){
 let driver = await new Builder().forBrowser("MicrosoftEdge").build();
await driver.manage().window().maximize();
await driver.get("http://localhost:3000/sea-transport");
await driver.sleep(3000);
await driver.findElement(By.xpath("//*[@id='root']/div[1]/div[1]/div[2]/button[1]")).click();
await driver.sleep(1000);
let text=await driver.findElement(By.xpath("//*[@id=':r3:']")).getText();
//search for confirmation message
chai.assert.include(text,"Sea Transport History");
await driver.quit();
});

//______Ground____

it("Add a new Ground transport",async function(){
let driver = await new Builder().forBrowser("MicrosoftEdge").build();
await driver.manage().window().maximize();
await driver.get("http://localhost:3000/ground-transport");
//click New Route button
await driver.findElement(By.xpath("//*[@id='root']/div[1]/div[1]/div[2]/button[2]")).click();
//Add a new Route
await driver.findElement(By.id("trackNumber")).sendKeys("416");
await driver.findElement(By.id("routeID")).sendKeys("4116");
await driver.findElement(By.id("co2")).sendKeys("20");
await driver.findElement(By.id("truckId")).sendKeys("4116");
await driver.findElement(By.id("fuelCost")).sendKeys("50");
await driver.findElement(By.id("laborCost")).sendKeys("60");
await driver.findElement(By.id("custCost")).sendKeys("60");
await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div/div[2]/button[2]")).click();
await driver.sleep(1000);
let alert=await driver.findElement(By.xpath("//*[@id='root']/div[1]/div/div[2]")).getText();
chai.assert.include(alert,"Success");
await driver.quit();
});

it("Edit Ground transport Details",async function(){
 let driver = await new Builder().forBrowser("MicrosoftEdge").build();
await driver.manage().window().maximize();
await driver.sleep(4000);
await driver.get("http://localhost:3000/ground-transport");
await driver.sleep(4000);
//Edit fuel cost
await driver.findElement(By.xpath("/html/body/div/div[1]/div[2]/table/tbody/tr[5]/td[22]/button[1]")).click();
await driver.findElement(By.id("fuelCost")).sendKeys("0");
await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div/div[2]/button[2]")).click();
await driver.sleep(3000);
let alert=await driver.findElement(By.xpath("/html/body/div/div[1]/div[2]/div/div[2]")).getText();
//search for confirmation message
chai.assert.include(alert,"Success");
await driver.quit();

});
it("Delete Ground transport Details",async function(){
 let driver = await new Builder().forBrowser("MicrosoftEdge").build();
await driver.manage().window().maximize();
await driver.get("http://localhost:3000/ground-transport");
await driver.sleep(3000);
//delete
await driver.findElement(By.xpath("/html/body/div/div[1]/div[2]/table/tbody/tr[5]/td[22]/button[2]")).click();
await driver.sleep(3000);//minimum
let alert=await driver.findElement(By.xpath("/html/body/div/div[1]/div[2]/div/div[2]")).getText();
//search for confirmation message
chai.assert.include(alert,"Success");
await driver.quit();
});

it("Show Ground Transport History",async function(){
 let driver = await new Builder().forBrowser("MicrosoftEdge").build();
await driver.manage().window().maximize();
await driver.get("http://localhost:3000/ground-transport");
await driver.sleep(3000);
await driver.findElement(By.xpath("//*[@id='root']/div[1]/div[1]/div[2]/button[1]")).click();
await driver.sleep(2000);
let text=await driver.findElement(By.xpath("//*[@id=':r3:']")).getText();
//search for confirmation message
chai.assert.include(text,"Ground Transport History");
await driver.quit();
});

});
