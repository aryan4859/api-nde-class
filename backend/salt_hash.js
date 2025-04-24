const crypto = require("crypto");

// Function to demonstrate hashing and custom salting
function demonstrateCustomHashingAndSalting() {
  const password = "StudentPassword123"; // Example password
  const customSalt = "@"; // Custom salt string

  console.log("Original Password: ", password);
  console.log("Custom Salt: ", customSalt);

  // Hash the password without salt
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  console.log("Hash without Salt: ", hash);

  // Hash the password with custom salt
  const saltedHash = crypto
    .createHash("sha256")
    .update(password + customSalt)
    .digest("hex");
  console.log("Hash with Custom Salt: ", saltedHash);

  // Verifying password (simulated)
  const inputPassword = "StudentPassword123"; // Example input password
  const inputSaltedHash = crypto
    .createHash("sha256")
    .update(inputPassword + customSalt)
    .digest("hex");
  const isMatch = inputSaltedHash === saltedHash;
  console.log("Password Match: ", isMatch);

  // Verifying a wrong password
  const wrongInputPassword = "WrongPassword12"; // Example wrong password
  const wrongSaltedHash = crypto
    .createHash("sha256")
    .update(wrongInputPassword + customSalt)
    .digest("hex");
  const isWrongMatch = wrongSaltedHash === saltedHash;
  console.log("Wrong Password Match: ", isWrongMatch);
}

// Call the function
demonstrateCustomHashingAndSalting();