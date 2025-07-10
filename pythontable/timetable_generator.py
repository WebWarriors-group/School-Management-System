def generate_timetable(data):
    # Simple round-robin filling for demo

    cls = data.classes[0]
    days = data.days
    periods_per_day = data.periods_per_day

    # Prepare result dict
    timetable = {cls: {day: [None]*periods_per_day for day in days}}

    # Flatten assignments with subject and remaining periods count
    assignments = []
    for a in data.assignments:
        assignments.append({
            'subject': a.subject,
            'remaining': a.periods_per_week,
        })

    # Simple scheduling: fill slots day by day, period by period
    idx = 0
    total_periods = len(days) * periods_per_day

    for day in days:
        for p in range(periods_per_day):
            # Find next subject with remaining > 0
            found = False
            for _ in range(len(assignments)):
                sub = assignments[idx % len(assignments)]
                idx += 1
                if sub['remaining'] > 0:
                    timetable[cls][day][p] = sub['subject']
                    sub['remaining'] -= 1
                    found = True
                    break
            if not found:
                timetable[cls][day][p] = None  # free period

    return timetable
