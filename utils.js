export const validateEmail = (email) => {
    if (!email) return { isValid: false, message: "Email is required" };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, message: "Invalid email format" };
    }
    if (!email.toLowerCase().endsWith('@mnsuam.edu.pk')) {
        return { isValid: false, message: "Please use your official university email (@mnsuam.edu.pk)" };
    }
    return { isValid: true, message: "" };
};

export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

export const GRADES = {
    'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0
};

export const calculateGPA = (courses) => {
    let totalPoints = 0;
    let totalCredits = 0;
    let hasError = false;

    if (!courses || courses.length === 0) {
        return { gpa: null, error: "No courses provided" };
    }

    courses.forEach(course => {
        if (course.credits) {
            const credit = parseFloat(course.credits);
            if (isNaN(credit)) {
                hasError = true;
            } else {
                const gradePoint = GRADES[course.grade] !== undefined ? GRADES[course.grade] : 0;
                totalPoints += gradePoint * credit;
                totalCredits += credit;
            }
        }
    });

    if (hasError) {
        return { gpa: null, error: "Invalid credit input found" };
    }

    if (totalCredits === 0) {
        return { gpa: null, error: "Total credits cannot be zero" };
    }

    return { gpa: (totalPoints / totalCredits).toFixed(2), error: null };
};
