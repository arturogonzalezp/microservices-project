const assert = require('chai').assert;
const fs = require('fs');
const db = require('../tasks/utils/db-manager');

const test_user_id = "test10@test.com";
const test_add_task = {
    "title": "task title 3",
	"description": "task description 3",
	"dueDate": "20/10/11 15:00:00",
	"reminder": "20/4/11 15:00:00"
}
const test_no_task_for_user = {
    "code": 400,
    "message": "There are no tasks for user test10@test.com"
}
const test_no_task = {
    "code": 400,
    "message": "There is no task with ID 1"
}

describe('Tasks microservice', () => {
    it('Create Task', () => {
        var result = db.addTask("test10test.com", test_add_task, function(result, isSuccess) {
            console.log(result);
            assert.deepEqual(result, test_add_task);
        });
    });
    it('Get Tasks For User', () => {
        var result = db.getAllTasksForUserId("test10test.com", function(result, isSuccess) {
            console.log(result);
            assert.deepEqual(result, test_no_task_for_user);
        });
    });
    it('Delete Task', () => {
        var result = db.deleteTaskWithId(1, function(result, isSuccess) {
            console.log(result);
            assert.deepEqual(result, test_no_task);
        });
    });
});