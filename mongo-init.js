print('RUNNING INIT FILE ##################################@@@@@@@@@@@@@@@@@@@@@@@')

dbAdmin = db.getSiblingDB("socialnetwork");
dbAdmin.createUser({
  user: "ali",
  pwd: "ali",
  roles: [{ role: "userAdminAnyDatabase", db: "socialnetwork" }],
  mechanisms: ["SCRAM-SHA-1"],
});

// Authenticate user
dbAdmin.auth({
  user: "ali",
  pwd: "ali",
  mechanisms: ["SCRAM-SHA-1"],
  digestPassword: true,
});

// Create DB and collection
db = new Mongo().getDB("socialnetwork");
db.createCollection("users", { capped: false });
db.insertOne({name:"ali"})
