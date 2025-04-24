// Function to obfuscate a string using Base64 encoding and XOR cipher
function obfuscateString(input, key) {
    // Step 1: XOR Cipher
    const xorResult = input
      .split("")
      .map((char, index) => String.fromCharCode(char.charCodeAt(0) ^ key[index % key.length].charCodeAt(0)))
      .join("");
  
    // Step 2: Base64 Encoding
    const base64Encoded = Buffer.from(xorResult).toString("base64");
    return base64Encoded;
  }
  
  // Function to de-obfuscate a string
  function deobfuscateString(obfuscated, key) {
    // Step 1: Base64 Decoding
    const base64Decoded = Buffer.from(obfuscated, "base64").toString("utf8");
  
    // Step 2: XOR Cipher
    const originalString = base64Decoded
      .split("")
      .map((char, index) => String.fromCharCode(char.charCodeAt(0) ^ key[index % key.length].charCodeAt(0)))
      .join("");
  
    return originalString;
  }
  
  // Example Usage
  const originalString = "HelloObfuscation!";
  const key = "MySecretKey";
  
  console.log("Original String: ", originalString);
  
  // Obfuscating the string
  const obfuscatedString = obfuscateString(originalString, key);
  console.log("Obfuscated String: ", obfuscatedString);
  
  // De-obfuscating the string
  const deobfuscatedString = deobfuscateString(obfuscatedString, key);
  console.log("De-obfuscated String: ", deobfuscatedString);