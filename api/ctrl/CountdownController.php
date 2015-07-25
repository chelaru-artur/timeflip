<?php

class CountdownController extends AbstractController {
	// Function to update task
	public function updatetasks() {
		if($this->is_ajax()) {
			$this->db->query('UPDATE countdown SET options = :options WHERE id = :id');
			$this->db->bind(':id', $_POST['id']);
			$this->db->bind(':options', $_POST['options']);
			
			if($this->db->execute()) {
				echo true;
			} else {
				echo false;
			}
		} else {
			die('Not allowed to see this URL.');
		}
	}

	// Function to get all tasks
	public function gettasks() {
		if($this->is_ajax()) {
			$this->db->query('SELECT * FROM countdown WHERE id = :id');
			$this->db->bind(':id', 1);
			$tasks = $this->db->resultset();

			$task_opt = array();
			foreach($tasks as $task) {
				$task_opt[] = json_decode($task->options);
			}

			echo json_encode($task_opt);
		} else {
			die('Not allowed to see this URL.');
		}
	}
}