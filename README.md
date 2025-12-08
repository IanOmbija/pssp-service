# PSSP Readiness Service

This PSSP API will generate a personalized readiness score for each learner based on their engagement, assessments, and completed modules.

---

#### **Requirements**
- Node.js >= 18
- npm or yarn
- TypeScript 5.x
- ts-node-dev (development runner)
- Jest (test framework)
- Supertest (HTTP integration testing)



## Quick Set up and Run


```bash
# Setting up on your local environment
git clone <your-repo-url>

cd into the folder: pssp-service

# Install dependencies
npm install

# Start development server
npm run dev

```

---

The app will run at `http://localhost:3000` by default.

Since this is for demo purposes, we will run it on development mode.

## API Reference and Sample Endpoints

Sample URL: **`http://localhost:3000`**

**User/Student Readiness**

#### - Calculate Learner's readiness parameters


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `learner_id` | `string or number` | **Optional**. Learner's identity|
| `academics` | `number` | **Required**. Academics score|
| `career_skills` | `number` | **Required**. Learner's careers skills |
| `life_skills` | `number` | **Required**. Learner's life skills |

```http
POST  api/readines
```

Sample `request` sent to the endpoint

```http
POST  http://<yourlocalhosturl>/api/readines
```
Computes the learner readiness score and returns insights.
#### Sample Request Body
```json
{
    "learner_id": "Student123",
    "scores": {
        "academics": 7,
        "career_skills": 3,
        "life_skills": 65
    }
}

```

#### Success Response 200 OK
```json
{
    "readiness_score": 20.1,
    "readiness_label": "Beginner",
    "component_scores": {
        "academics": 7,
        "career_skills": 3,
        "life_skills": 65
    },
    "recommendation": "Need to focus on career skills and academics to improve overall readiness.",
    "risk_flags": [
        "academics",
        "career_skills"
    ]
}
```
##
## Scoring Logic

The readiness score is computed using a weighted average across the three core dimensions:

| Category      | Weight |
| ------------- | ------ |
| Academics     | 0.40   |
| Career Skills | 0.35   |
| Life Skills   | 0.25   |

#### **Some assumptions/implementations we have under our logic**
- Inputs: numeric component scores expected in 0–100.
- Any missing category is assigned a default baseline score of 50.
- Overall readiness score: weighted average of components is rounded to 1 decimal place.
- Risk flags: any component with a score below `<60 `is flagged.


| Score Range | Label         |
| ----------- | ------------- |
| < 50        | Beginner |
| 50–74       | Building      |
| ≥ 75        | Ready         |

## Recommendations Logic

- Identify the learner’s strongest and weakest domains.

- Highlight any that fall below 60 (risk flags).
- If there's no risk flags and score >= 80 a positive advancement recommendation is returned.
## Assumptions and Trade-offs


- No persistent storage for simplicity.
- Any missing category is assigned a default baseline score of 50.
- Weights are hard-coded for the task, ideally in production they should be A/B tested or learned from outcomes.
- Risk flags: any component with a score below `<60 `is flagged.



## Future Extensions and Suggestions 

If this service were productionized:

- Add persistence (PostgreSQL or MongoDB)

- Add authentication/authorization

- Add domain configurability (dynamic weights)

- Provide versioned scoring models

- Add more on the scoring module/formula
- Separate the `recommendation service` from the `scoring service` to allow maintability and future extension (e.g., additional scoring domains)

- Add OpenAPI/Swagger documentation
## Running Tests

Simply execute the bash script to run the available tests

```bash
# To run the unit tests
npm test

```

---
## 🔗  Loom Link
[![Code & Set up Walkthrough](https://img.shields.io/badge/codewalkthrough-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://www.loom.com/share/bb7efcf974244305ba5f109991f6e724) :https://www.loom.com/share/bb7efcf974244305ba5f109991f6e724



## Authors

- Developed by: [@IanOmbija](https://www.github.com/IanOmbija)

