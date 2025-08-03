# Architectural Options for Proto-Driven Schema Verification

This document summarizes five architectural patterns for verifying entity schemas generated from Protobuf definitions across multiple microservices (Java, TypeScript, Python).

---

## Option 1: Native In-House Verification

Each microservice contains its own verification logic written in its native language. The build process runs this native code to compare the developer's entity against the auto-generated one.

### How it Works
- **Java:** A Maven/Gradle plugin runs a Java class that uses reflection to inspect the fields and types of both the developer's `User.java` and the generated `gen/User.java` and asserts their structures are identical.
- **NestJS (TypeScript):** An `npm` script uses the TypeScript Compiler API to create an Abstract Syntax Tree (AST) for both entity files. It then traverses the trees to compare properties and types.
- **Python:** A script uses the `inspect` module to dynamically examine the attributes of both the developer's and the generated entity classes.

### Pros & Cons
- **Ease of Use:** Medium. Developers can debug in their native language, but the logic (reflection, AST parsing) is complex to write correctly.
- **Build Time:** **Fastest.** No external runtimes are needed.
- **Architecture & Maintenance:** **High Cost.** You must implement and maintain three separate, complex verification engines, risking logic divergence.

---

## Option 2: Centralized Polyglot Script

A single script (e.g., in Python) is responsible for verification. This script is executed by the build process of each microservice and parses the source code of both entity files as plain text.

### How it Works
The build tool (Maven, npm) executes a command like `python verify.py --lang=java ...`. The Python script then uses regular expressions to find and compare field definitions.

**Example (`verify.py` snippet):**
```python
# WARNING: This approach is fragile.
import re

def parse_java_fields(source_code):
    # This regex is simple and will easily break.
    pattern = r"private\s+(\w+)\s+(\w+);"
    return re.findall(pattern, source_code)

generated_fields = parse_java_fields(generated_code)
source_fields = parse_java_fields(source_code)

if generated_fields != source_fields:
    print("Error: Entity mismatch!")
    exit(1)
```

### Pros & Cons
- **Ease of Use:** High. The logic is centralized.
- **Build Time:** **Slowest.** Each build must start a separate process (e.g., Python), adding overhead.
- **Architecture & Maintenance:** **Brittle.** Parsing source code with regex is fragile and can easily break with minor formatting changes, comments, or new language syntax.

---

## Option 3: Schema Artifact Verification (Recommended)

The automation process generates **two** artifacts: the standard entity code and a simple, language-agnostic **schema file** (e.g., JSON). Each service uses simple, native logic to compare its entity against this stable JSON artifact.

### How it Works
1.  **Generation:** The automation pipeline creates `gen/User.java` and `schemas/user.schema.json`.
2.  **Verification:** A standard unit test in each service reads the JSON and uses native reflection to verify the local entity.

**Example (`user.schema.json`):**
```json
{
  "name": "User",
  "fields": [
    { "name": "userId", "type": "java.lang.String" },
    { "name": "email", "type": "java.lang.String" }
  ]
}
```
**Example (Java JUnit Test):**
```java
@Test
void verifyUserEntityAgainstSchema() throws Exception {
    // 1. Load the schema JSON from the test resources
    InputStream schemaStream = this.getClass().getResourceAsStream("/schemas/user.schema.json");
    // ...parse JSON...

    // 2. Get the developer's class using Java Reflection
    Class<?> entityClass = Class.forName("com.mycorp.entities.User");

    // 3. Compare fields from JSON to fields from reflection
    // ...assertions...
}
```

### Pros & Cons
- **Ease of Use:** **Highest.** Verification logic is simple and failures are standard test failures.
- **Build Time:** Very Fast. JSON parsing and reflection are highly optimized.
- **Architecture & Maintenance:** **Most Robust.** Decouples verification from code syntax. The JSON is a stable, explicit contract.

---

## Option 4: Direct Integration (The "No-Sync" Approach)

Developers do not maintain their own entity files. They directly import and use the auto-generated Protobuf classes throughout the application's business logic.

### How it Works
The developer's code in `UserService.java` directly imports `com.example.generated.User`. There is no `com.mycorp.entities.User.java` to verify, eliminating the problem entirely.

### Pros & Cons
- **Architecture & Maintenance:** **Zero Maintenance.** Impossible for entities to be out of sync.
- **Build Time:** **Fastest.** No verification step is needed.
- **The Major Drawback: Inflexibility.** Generated classes are simple DTOs. You cannot add custom business logic (e.g., `user.isAdministrator()`) or framework-specific annotations (`@Entity`, `@Id`, `@NotNull`). This violates the principle of separating your internal domain model from external data contracts.

---

## Option 5: Centralized Artifact Repository (The "Enterprise" Approach)

This pattern professionalizes the process by treating the generated entities and schemas as versioned libraries (artifacts) published to a central repository like JFrog Artifactory, Sonatype Nexus, or GitHub Packages.

### How it Works
1.  **Publishing:** The Protobuf automation pipeline packages the generated code/schemas into a `.jar` (for Java), an `npm` package (for TS), etc., and publishes them with a version number (e.g., `1.2.3`).
2.  **Consuming:** Each microservice declares a dependency on this artifact in its `pom.xml` or `package.json`.
3.  **Verification:** The service uses its preferred verification method (ideally **Option 3**) to compare its local entity against the schema/class from the downloaded artifact.

### Pros & Cons
- **Architecture & Maintenance:** **Most Scalable & Clean.** Decouples services from the generation process via clear, traceable versioning.
- **Ease of Use:** Excellent for developers, who use familiar package managers.
- **Robustness:** **Highest.** Provides clear versioning and prevents dependency conflicts.
- **The Major Drawback: Infrastructure Complexity.** Requires setting up and managing a central artifact repository, which adds operational overhead.

---

## Final Recommendation

The optimal solution is a combination of **Option 5 (Artifact Repository)** and **Option 3 (Schema Artifact Verification)**. This provides:
1.  **Clean Dependency Management:** Services consume versioned, published artifacts.
2.  **Rock-Solid Verification:** The build process uses a simple, robust, and developer-friendly unit test to compare native code against a stable JSON schema.
