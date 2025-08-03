This file is a shared workspace for our interactions. I will use it to keep track of our conversations, remember key details about your project, and store information that helps me better assist you.

**How you can use this file:**

*   **Provide Context:** You can add details about your project, such as its goals, technologies used, and any specific conventions you follow.
*   **Set Preferences:** If you have preferences for how I should behave (e.g., coding style, tone), you can note them here.
*   **Leave Notes:** Feel free to leave me notes, questions, or reminders for our next session.

By providing this information, you can help me understand your needs better and provide more accurate and relevant responses.

---
**Instructions for Gemini:**

*   Always provide the most reliable, reusable code that follows best practices.
*   The solution must be flexible, reliable, and reusable, capable of handling numerous entities and multiple databases.

---
**Project Context: Proto-Driven Schema Verification**

**Goal:** To ensure SQL database schema consistency across multiple microservices (Java/Spring Boot, TypeScript/NestJS) by using a central repository of Protobuf schema definitions.

**Chosen Architecture:** A combination of **Option 5 (Centralized Artifact Repository)** and **Option 3 (Schema Artifact Verification)** from the `architectural_options_summary.md` document.

**Workflow:**
1.  **Schema Definition:** Database schema changes are first defined in `.proto` files within a dedicated repository.
2.  **CI/CD Automation:** A pipeline will automatically:
    *   Generate language-specific entity/DTO classes from the `.proto` files.
    *   Generate a language-agnostic JSON schema file for each entity.
    *   Package the generated code and the JSON schema into versioned artifacts (e.g., `.jar` for Java, `npm` package for TypeScript).
    *   Publish these artifacts to a central repository (like Artifactory, Nexus, or GitHub Packages).
3.  **Microservice Consumption:** Each microservice will declare a dependency on the appropriate versioned artifact.
4.  **Verification:** During the build process of each microservice, a unit test will:
    *   Load the JSON schema from the downloaded artifact.
    *   Use native reflection or introspection to compare the developer's hand-written entity class against the structure defined in the JSON schema.
    *   Fail the build if there is a mismatch.