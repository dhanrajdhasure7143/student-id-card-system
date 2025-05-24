/**
 * Populates the analytics dashboard with data from the students list.
 * This includes the total number of students, the number of students with a photo, the number of students with an email,
 * and a bar chart showing the distribution of students per course and a pie chart showing the distribution of students
 * per semester.
 */
function showAnalyticsDashboard() {
    const total = allStudents.length;
    const withPhoto = allStudents.filter(s => s.photo && s.photo.startsWith('data:image')).length;
    const withEmail = allStudents.filter(s => s.email && s.email.includes('@')).length;

    document.getElementById('analytics-total').textContent = total;
    document.getElementById('analytics-photo').textContent = withPhoto;
    document.getElementById('analytics-email').textContent = withEmail;

    const courseCount = {};
    const semesterCount = {};

    allStudents.forEach(s => {
        const course = s.course || 'Unknown';
        const semester = s.semester || 'Unknown';

        courseCount[course] = (courseCount[course] || 0) + 1;
        semesterCount[semester] = (semesterCount[semester] || 0) + 1;
    });

    if (window.courseChart && typeof window.courseChart.destroy === 'function') {
        window.courseChart.destroy();
    }
    if (window.semesterChart && typeof window.semesterChart.destroy === 'function') {
        window.semesterChart.destroy();
    }


    window.courseChart = new Chart(document.getElementById('courseChart'), {
        type: 'bar',
        data: {
            labels: Object.keys(courseCount),
            datasets: [{
                label: 'Students per Course',
                data: Object.values(courseCount),
                backgroundColor: '#007bff',
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            }
        }
    });

    window.semesterChart = new Chart(document.getElementById('semesterChart'), {
        type: 'pie',
        data: {
            labels: Object.keys(semesterCount),
            datasets: [{
                label: 'Semester Distribution',
                data: Object.values(semesterCount),
                backgroundColor: [
                    '#007bff', '#28a745', '#ffc107', '#dc3545', '#17a2b8',
                    '#6f42c1', '#fd7e14', '#20c997'
                ],
            }]
        },
        options: {
            responsive: true
        }
    });
}

// console.log("Script loaded");

function clearSearch() {
    const input = document.getElementById('searchInput');
    input.value = '';
    filterStudents();
    toggleClearBtn();
  }

  function toggleClearBtn() {
    const input = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearchBtn');
    clearBtn.style.display = input.value.trim() ? 'inline-block' : 'none';
  }