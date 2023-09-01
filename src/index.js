/* TODO
    Main Features
        - Dashboard-style display
            - Multiple sections each showing different information
        - Multiple sections/panels
            - Problems from followed users
                - Add users to follow (Feature) (*)
            - Problems with tagged/starred topics
                - Star/Tag/Follow topics (Feature)
            - Random problem/Problem of the day
                - Skip/Find new problem (Feature)
            - New/Hot Problems
                - Change time period (Feature)
            - Problem Search
                - Filter by (Feature):
                    - Point Value
                    - Topic
                    - etc.
                - Show users that completed (Feature)
            - Followed Users List
                - (*) Location to add users to follow
                - Popup/Foldout to see information - points, problems solved, etc. (Feature)
        - Use DMOJ API to find information
        - Problem View/Display for every problem
            - Show Title, topic, point value, etc. (Feature)
            - Popup/Foldout to see more detailed information
                - Author
                - Time/Memory Limit
                - Problem Statement
                - etc.
    
    Think about?
        - Adding React to build UI components
            - Components make the UI logic easier to organize and build
            - Examples of possible components:
                - Problem View/Display
                - Information Panel
                - etc.

    Refactoring
        - Add error handling to network requests
            - Think about alternatives to try/catch but use if necessary
        - Add a server to act as a CORS proxy
            - It should take in DMOJ request and send results with CORS headers
        - Add bundling with webpack to allow babel to work
            - Look at TetrisClone for configuration details
        
*/
// This code is meant as a base/starting point for the rest of this project

const baseURL = 'https://cors-anywhere.herokuapp.com/https://dmoj.ca/api';
const defaultOptions = { headers: { origin: 'http://localhost:8080' } };

// Followed Users - Display problems from followed users
// Given an array of users and n problems to display, this function displays the last n problems the user submitted
const followedUsersProblems = async (users, numProblems) => {
    const problemsListData = await fetch(`${baseURL}/problem/list`, defaultOptions);
    const problemsList = await problemsListData.json();

    const requests = [];
    for (let i = 0; i < users.length; i += 1) {
        requests.push(fetch(`${baseURL}/user/submissions/${users[i]}`, defaultOptions));
    }
    const responses = await Promise.all(requests);

    const jsonRequests = [];
    for (let i = 0; i < responses.length; i += 1) {
        jsonRequests.push(responses[i].json());
    }
    const submissions = await Promise.all(jsonRequests);

    for (let i = 0; i < submissions.length; i += 1) {
        // eslint-disable-next-line no-console
        console.log(users[i]);

        const userSubmissions = Object.values(submissions[i]);
        const userProblems = [];

        let index = 0;
        while (userProblems.length < numProblems) {
            const userSubmission = userSubmissions[userSubmissions.length - index - 1];
            const problemName = problemsList[userSubmission.problem].name;
            if (!userProblems.includes(problemName)) {
                userProblems.push(problemName);
            }
            index += 1;
        }

        for (const name of userProblems) {
            // eslint-disable-next-line no-console
            console.log(name);
        }
    }
};

followedUsersProblems(['dnteu', 'maillew', 'jdabtieu', 'charliezhao06'], 10);
