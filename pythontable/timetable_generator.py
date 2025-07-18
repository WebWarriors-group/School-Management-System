def generate_timetable(data):
    timetable = {}
    teacher_schedule = {}

    # Initialize timetable dictionary for all classes
    for cls in data.classes:
        timetable[cls] = {day: [None] * data.periods_per_day for day in data.days}

    # Assign subjects for each class
    for cls in data.classes:
        class_assignments = [
            {
                'subject': a.subject,
                'teacher': a.teacher,
                'remaining': a.periods_per_week
            }
            for a in data.assignments if a.class_ == cls
        ]

        for day in data.days:
            daily_subjects = set()  # To ensure subject is not repeated on the same day

            for period_idx in range(data.periods_per_day):
                assigned = False
                for assignment in class_assignments:
                    if assignment['remaining'] <= 0:
                        continue
                    if assignment['subject'] in daily_subjects:
                        continue  # Skip if subject already assigned today

                    if (day, period_idx) not in teacher_schedule:
                        teacher_schedule[(day, period_idx)] = set()

                    if assignment['teacher'] not in teacher_schedule[(day, period_idx)]:
                        # Assign this subject
                        timetable[cls][day][period_idx] = {
                            'subject': assignment['subject'],
                            'teacher': assignment['teacher']
                        }
                        teacher_schedule[(day, period_idx)].add(assignment['teacher'])
                        assignment['remaining'] -= 1
                        daily_subjects.add(assignment['subject'])  # mark subject as used today
                        assigned = True
                        break

                if not assigned:
                    timetable[cls][day][period_idx] = None  # Free period

    return timetable
