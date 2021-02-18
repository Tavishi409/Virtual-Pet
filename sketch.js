var dog,sadDog,happyDog;
var foodS,foodObject,foodStock,addFood,feed;
var fedTime, lastFed;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodObject= new food();
  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  feed = createButton("Feed the Dog");
  feed.position(700,90);
  feed.mousePressed(feedDog);

  addFood = createButton("Add the Food");
  addFood.position(800,90);
  addFood.mousePressed(addFoods);
}

function draw() {
  background(46,139,87);

  foodObject.display();

fedTime = database.ref('feedTime');
fedTime.on("value",function(data){;
lastFed = data.val();
});


fill("white");
textSize(15);
if (lastFed >= 12)
{
 text("Last Fed: " +lastFed%12+ " PM", 600,90) 
}
else if(lastFed === 0)
{
  text("LastFed: 12am", 600, 90);
}
else { 
  text("Last Fed: " +lastFed+ "AM", 600, 90);
}

  drawSprites();
}

function feedDog(){
  dog.addImage(happyDog);
  if (foodObject.getfoodStock()<=0){
    foodObject.updatefoodStock(foodObject.getfoodStock()*0);
  }
  else{
    foodObject.updatefoodStock(foodObject.getfoodStock()-1);
  }
  console.log(foodObject.getfoodStock());

  database.ref('/').update({
    food:foodObject.getfoodStock(),
    feedTime:hour()
  })
  
}

function readStock(data){
foodS = data.val();
foodObject.updatefoodStock(foodS); 
}
function addFoods(){
  console.log("Food"+foodS);
  foodS= foodS+1;
  database.ref().update({
    food : foodS
  })
}