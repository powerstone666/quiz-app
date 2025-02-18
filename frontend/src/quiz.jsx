import React, { useMemo } from "react";
import { Box, Typography, List, ListItem, Paper } from "@mui/material";

// Function to extract JSON block from the response text
function parseQuestions(text) {
  if (text.includes("```json")) {
    const parts = text.split("```json");
    if (parts.length > 1) {
      // Extract the JSON block and trim it
      const jsonBlock = parts[1].split("```")[0].trim();
      let questionsResult;
      try {
        questionsResult = JSON.parse(jsonBlock);
      } catch (err) {
        console.error("JSON parse error for questions, falling back to regex:", err);
      }
      if (questionsResult && questionsResult.length > 0) {
        return questionsResult;
      }
    }
  }
  // Fallback if no JSON block is found
  return [];
}

function Quiz({ questions }) {
  // Parse the questions if 'questions' is a string
  const parsedQuestions = useMemo(() => {
    if (typeof questions === "string") {
      return parseQuestions(questions);
    }
    return questions;
  }, [questions]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Quiz
      </Typography>
      {parsedQuestions.length > 0 ? (
        parsedQuestions.map((q, idx) => (
          <Paper key={idx} sx={{ p: 2, mb: 3 }} elevation={3}>
            {/* Display the question */}
            <Typography variant="h6">
              Q{idx + 1}: {q.question_text || q.question}
            </Typography>
            {/* Display the options if available */}
            {q.options ? (
              <List>
                {Array.isArray(q.options) ? (
                  q.options.map((option, i) => {
                    // If option is an object, display its 'optionText' property
                    const optionText =
                      typeof option === "object"
                        ? option.optionText || JSON.stringify(option)
                        : option;
                    return (
                      <ListItem key={i}>
                        <Typography variant="body1">
                          {optionText}
                        </Typography>
                      </ListItem>
                    );
                  })
                ) : typeof q.options === "object" ? (
                  // If options is an object (with key-value pairs), iterate over entries
                  Object.entries(q.options).map(([key, value]) => {
                    const optionText =
                      typeof value === "object"
                        ? value.optionText || JSON.stringify(value)
                        : value;
                    return (
                      <ListItem key={key}>
                        <Typography variant="body1">
                          {key}: {optionText}
                        </Typography>
                      </ListItem>
                    );
                  })
                ) : (
                  <Typography variant="body2">
                    No options available.
                  </Typography>
                )}
              </List>
            ) : (
              <Typography variant="body2">No options available.</Typography>
            )}
            {/* Display the answer and explanation if available */}
            {(q.answer || q.explanation) ? (
              <Box sx={{ mt: 2 }}>
                {q.answer && (
                  <Typography variant="subtitle1">
                    Answer:{" "}
                    {typeof q.answer === "object"
                      ? q.answer.optionText || JSON.stringify(q.answer)
                      : q.answer}
                  </Typography>
                )}
                {q.explanation && (
                  <Typography variant="body2" color="textSecondary">
                    Explanation: {q.explanation}
                  </Typography>
                )}
              </Box>
            ) : (
              <Typography variant="body2" sx={{ mt: 2 }}>
                No answer provided.
              </Typography>
            )}
          </Paper>
        ))
      ) : (
        <Typography>No questions available.</Typography>
      )}
    </Box>
  );
}

export default Quiz;
