<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Pusher\Pusher;

class ChatController extends Controller
{
    public function sendMessage(Request $request)
    {
        $message = $request->input('message');
        $userId = auth()->id(); // Or use session ID if not authenticated
        
        // Get response using rule-based approach
        $aiResponse = $this->getRuleBasedResponse($message);
        
        // Send response via Pusher
        $pusher = new Pusher(
            env('REVERB_APP_KEY'),
            env('REVERB_APP_SECRET'),
            env('REVERB_APP_ID'),
            [
                'cluster' => env('REVERB_APP_CLUSTER'),
                'useTLS' => true,
                'host' => env('REVERB_HOST'),
                'port' => env('REVERB_PORT'),
                'scheme' => env('REVERB_SCHEME', 'https'),
            ]
        );
        
        $pusher->trigger('ai-chat', 'message.sent', [
            'message' => $aiResponse,
            'userId' => $userId
        ]);
        
        return response()->json(['success' => true]);
    }
    
    private function getRuleBasedResponse($message)
    {
        // Convert message to lowercase for easier matching
        $message = strtolower($message);
        
// Define keyword patterns and responses
$responses = [
    // Greetings
    ['keywords' => ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'], 
     'response' => "Hello! I'm your student assistant. I can help with exam preparation, study tips, and questions about your student dashboard. What would you like to know?"],
    
    // Exam Preparation
    ['keywords' => ['prepare', 'study', 'how', 'tips'], 
     'response' => "To prepare for exams effectively: 1) Create a study schedule, 2) Review class notes regularly, 3) Practice with past papers, 4) Get enough rest before the exam day. You can track your study progress in the dashboard's calendar section."],
    
    // Exam Schedule
    ['keywords' => ['when', 'exam', 'schedule', 'date', 'time'], 
     'response' => "You can find your exam schedule in the Academic Calendar section of your dashboard. Exams are typically scheduled at the end of each term. Check the calendar for specific dates and times."],
    
    // Exam Syllabus
    ['keywords' => ['syllabus', 'topics', 'covered', 'what'], 
     'response' => "The exam syllabus is based on what was covered in class. Check your course materials in the Courses section of your dashboard or ask your subject teacher for specific topics."],
    
    // Exam Pattern
    ['keywords' => ['pattern', 'format', 'structure', 'sections'], 
     'response' => "Most exams include multiple choice, short answer, and essay questions. The specific pattern varies by subject - check with your teacher for details. You can view past exam formats in the Grades section."],
    
    // Past Papers
    ['keywords' => ['past', 'previous', 'papers', 'sample'], 
     'response' => "Past exam papers are available in the Resources section of your dashboard or from your subject teachers. Practicing with these is one of the best ways to prepare. You can also check the Assignments section for practice materials."],
    
    // Exam Stress
    ['keywords' => ['stress', 'anxiety', 'nervous', 'worry'], 
     'response' => "Exam stress is normal! Try these tips: 1) Take regular breaks while studying, 2) Practice deep breathing, 3) Get enough sleep, 4) Talk to someone if you're feeling overwhelmed. You can also track your well-being in the dashboard's health section."],
    
    // Exam Day Tips
    ['keywords' => ['day', 'before', 'during', 'exam day'], 
     'response' => "On exam day: 1) Get a good night's sleep, 2) Eat a healthy breakfast, 3) Arrive early, 4) Read all instructions carefully, 5) Manage your time during the exam. Check your dashboard's Today's Schedule for exam locations."],
    
    // Subject-Specific Tips - Math
    ['keywords' => ['math', 'mathematics'], 
     'response' => "For math exams: Practice solving problems regularly, memorize key formulas, understand concepts rather than rote learning, and check your work for errors. You can find math resources in the Courses section of your dashboard."],
    
    // Subject-Specific Tips - Science
    ['keywords' => ['science'], 
     'response' => "For science exams: Focus on understanding concepts and principles, practice diagrams, review experiments, and be prepared for both theory and practical questions. Check the Science course page in your dashboard for lab materials."],
    
    // Subject-Specific Tips - English
    ['keywords' => ['english'], 
     'response' => "For English exams: Practice reading comprehension, essay writing, and grammar rules. Review literary texts and themes covered in class. You can find reading materials in the English course section of your dashboard."],
    
    // Subject-Specific Tips - History
    ['keywords' => ['history'], 
     'response' => "For history exams: Create timelines of events, understand cause and effect relationships, and practice explaining historical events in your own words. Check the History course page in your dashboard for study guides."],
    
    // Grades and Results
    ['keywords' => ['grade', 'marks', 'result', 'performance', 'score', 'pass', 'fail'], 
     'response' => "Your grades and performance metrics are available in the Grades section of your dashboard. Exam results are usually announced 2-3 weeks after exams. Passing marks are typically 50% or higher."],
    
    // Assignments
    ['keywords' => ['assignment', 'homework', 'submit', 'due'], 
     'response' => "You can check your assignments in the Assignments section of your dashboard. Upcoming due dates are highlighted, and you can submit completed work directly through the system. Let me know if you need help with a specific assignment!"],
    
    // Class Schedule
    ['keywords' => ['schedule', 'timetable', 'class', 'today', 'tomorrow'], 
     'response' => "Your class schedule is shown in the Today's Schedule section of your dashboard. You can also check the Academic Calendar for important dates and upcoming events. The schedule updates automatically with any changes."],
    
    // Attendance
    ['keywords' => ['attendance', 'absent', 'present', 'leave'], 
     'response' => "You can view your attendance history and current percentage in the Attendance section of your dashboard. If you need to report an absence, use the Leave Request form in the system."],
    
    // Fees and Payments
    ['keywords' => ['fee', 'payment', 'paid', 'due'], 
     'response' => "Information about your fee status is available in the Fees section of your dashboard. You can view payment history, due dates, and make online payments. For specific questions, contact the administration office."],
    
    // Courses and Subjects
    ['keywords' => ['course', 'subject', 'syllabus'], 
     'response' => "You can find information about your enrolled courses in the Courses section of your dashboard. Each course page includes syllabus, materials, and resources. You can also access teacher contact information there."],
    
    // Help and Support
    ['keywords' => ['help', 'support', 'assist', 'problem'], 
     'response' => "I'm here to help! You can ask me about exams, assignments, grades, schedule, attendance, fees, and courses. For technical support with the dashboard, contact the IT department through the Help section."],
    
    // Dashboard Navigation
    ['keywords' => ['dashboard', 'navigate', 'find', 'where'], 
     'response' => "Your dashboard has several sections: Grades, Assignments, Schedule, Attendance, Fees, and Courses. You can navigate using the menu on the left side. The search bar at the top can help you find specific information quickly."],
    
    // Notifications
    ['keywords' => ['notification', 'alert', 'message', 'reminder'], 
     'response' => "You'll receive notifications for important events like assignment due dates, exam schedules, and grade postings. Check the bell icon in the top-right corner of your dashboard for new notifications."],
    
    // Profile and Settings
    ['keywords' => ['profile', 'settings', 'account', 'change'], 
     'response' => "You can update your personal information and preferences in the Profile section of your dashboard. You can change your password, contact details, and notification settings there."],
    
    // Mobile Access
    ['keywords' => ['mobile', 'app', 'phone', 'access'], 
     'response' => "You can access your student dashboard from any device! The system is mobile-friendly, or you can download our school app for on-the-go access to all your student information."],
    
    // Default response
    ['keywords' => [], 
     'response' => "I'm your student assistant! I can help with exam preparation, study tips, and questions about your dashboard features. Ask me about assignments, grades, schedule, attendance, fees, courses, or exam-related topics. How can I assist you today?"]
];
        
        // Check each keyword set for matches
        foreach ($responses as $item) {
            if (empty($item['keywords'])) {
                continue; // Skip default until the end
            }
            
            foreach ($item['keywords'] as $keyword) {
                if (strpos($message, $keyword) !== false) {
                    return $item['response'];
                }
            }
        }
        
        // Return default response if no keywords matched
        return end($responses)['response'];
    }
}