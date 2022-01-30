export const setToken = ()=>{
  const token = localStorage.getItem('jwt')
  const config = {
    Authorization:`Bearer ${token}`
  }
  return config
}

export const QUIZ  = 
  {
    "quizId": 3,
    "subject": "English",
    "quizPhoto": "http://dummyimage.com/135x100.png/cc0000/ffffff",
    "quizTitle": "Software Engineer II",
    "quizContents": "Nulla tempus.",
    "quizAnswer": 3,
    "openStatus": true,
    "quizTimeout": 39,
    "quizGrade": 5,
    "userId": "ssafy3",
    "options": [
      "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.",
      "Praesent id massa id nisl venenatis lacinia.",
      "Cras non velit nec nisi vulputate nonummy.",
      "Cras pellentesque volutpat dui."
    ]
  }

export const surverUrl = 'http://localhost:8080/api/v1'