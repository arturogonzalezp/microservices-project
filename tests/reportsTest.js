const assert = require('chai').assert;
const fs = require('fs');
const db = require('../reports/utils/db-mananger');

const test_user_id = "test10@test.com";
const test_user_task_report = {
    "code": 200,
    "message": "Report successfully created.",
    "data": {
        "todaysTasks": [],
        "delayedTasks": []
    }
}
const test_user_habit_report = {
    "code": 200,
    "message": "Report successfully created.",
    "data": {
        "goodHabits": [],
        "badHabits": []
    }
}
const test_admin_task_report = {
    "code": 200,
    "message": "Report successfully created.",
    "data": [
        {
            "completedTasks": 0,
            "normalCompletedTasks": 0,
            "delayedCompletedTasks": 0,
            "delayedTasks": 0,
            "availableTasks": 0,
            "todayToCompleteTasks": 0
        }
    ]
}
const test_admin_habit_report = {
    "code": 200,
    "message": "Report successfully created.",
    "data": [
        {
            "blueHabits": 0,
            "greenHabits": 0,
            "yellowHabits": 0,
            "orangeHabits": 0,
            "redHabits": 0
        }
    ]
}

describe('Reports microservice', () => {
    it('Create user Task Report', () => {
        var result = db.getTaskReportUser("test10test.com", function(result, isSuccess) {
            assert.deepEqual(result, test_user_task_report);
        });
    });
    it('Create user Habit Report', () => {
        var result = db.getHabitsReportUser("test10test.com", function(result, isSuccess){
            assert.deepEqual(result, test_user_habit_report);
        });
    });
    it('Create admin Task Report', () => {
        var result = db.getTaskReportAdmin(new Date(), function(result, isSuccess){
            assert.deepEqual(result, test_admin_task_report);
        });
    });
    it('Create admin Habit Report', () => {
        var result = db.getHabitsReportAdmin(new Date(), function(result, isSuccess){
            assert.deepEqual(result, test_admin_habit_report);
        });
    });
});