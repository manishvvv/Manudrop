document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step');
    const startBtn = document.getElementById('start-btn');
    const quizForm = document.getElementById('quiz-form');
    const submitQuizBtn = document.getElementById('submit-quiz-btn');
    const claimBtn = document.getElementById('claim-btn');
    const quizError = document.getElementById('quiz-error');
    const verificationStatus = document.getElementById('verification-status');

    // Function to switch steps
    function showStep(stepId) {
        steps.forEach(step => {
            step.classList.remove('active');
        });
        const nextStep = document.getElementById(stepId);
        if (nextStep) {
            nextStep.classList.add('active');
        } else {
            console.error("Step not found:", stepId);
        }
    }

    // --- Event Listeners ---

    // Start Button
    if(startBtn) {
        startBtn.addEventListener('click', () => {
            showStep('step-task');
        });
    } else {
        console.error("Start button not found");
    }

    // Quiz Submission
    if(quizForm) {
        quizForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual form submission
            const selectedAnswer = quizForm.querySelector('input[name="quiz"]:checked');

            if (selectedAnswer) {
                quizError.style.display = 'none'; // Hide error message
                showStep('step-verifying');

                // Simulate verification delay
                verificationStatus.textContent = "Checking your answer against the blockchain ledger... please wait.";
                setTimeout(() => {
                    verificationStatus.textContent = "Validating transaction... almost there!";
                }, 1500); // Wait 1.5 seconds

                setTimeout(() => {
                    showStep('step-claim');
                }, 3000); // Wait total 3 seconds before showing claim step

            } else {
                quizError.style.display = 'block'; // Show error message
            }
        });
    } else {
         console.error("Quiz form not found");
    }


    // Claim Button (The final click before the reveal)
    if (claimBtn) {
        claimBtn.addEventListener('click', () => {
             // Optional: Add a tiny fake delay before the reveal for extra suspense
             claimBtn.textContent = "Processing...";
             claimBtn.disabled = true;

             setTimeout(() => {
                showStep('step-reveal');
            }, 500); // 0.5 second delay
        });
    } else {
         console.error("Claim button not found");
    }


    // Initialize: Show the first step
    showStep('step-intro');

});