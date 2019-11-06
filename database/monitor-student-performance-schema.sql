    CREATE  DATABASE `monitor_student_performance`;

    USE `monitor_student_performance`;

    CREATE TABLE `student`
    (
      `id` int PRIMARY KEY AUTO_INCREMENT,
      `name` varchar(255) not null unique,
      `identification_number` varchar(255) unique,
      `batch_id` int not null,
      `project_id` int unique
    );

    CREATE TABLE `project`
    (
      `id` int PRIMARY KEY AUTO_INCREMENT,
      `name` varchar(255) not null unique,
      `description` varchar(255) not null
    );

    CREATE TABLE `supervisor`
    (
      `id` int PRIMARY KEY AUTO_INCREMENT,
      `name` varchar(255) not null,
      `identification_number` varchar(255) not null unique
    );

    CREATE TABLE `supervisor_project`
    (
      `supervisor_id` int not null,
      `project_id` int not null
    );

    CREATE TABLE `program`
    (
      `id` int PRIMARY KEY AUTO_INCREMENT,
      `name` varchar(255) not null
    );

    CREATE TABLE `phase`
    (
      `id` int PRIMARY KEY  AUTO_INCREMENT,
      `name` varchar(255) not null unique,
      `description` varchar(255)
    );

    CREATE TABLE `batch`
    (
      `id` int PRIMARY KEY AUTO_INCREMENT,
      `program_id` int not null,
      `start_date` date not null,
      `project_start_date` date not null
    );

    CREATE TABLE `batch_phase`
    (
      `id` int PRIMARY KEY AUTO_INCREMENT,
      `batch_id` int not null,
      `phase_id` int not null,
      `deadline_date` date not null
    );

    CREATE TABLE `project_tracking`
    (
      `id` int PRIMARY KEY AUTO_INCREMENT,
      `project_id` int not null,
      `phase_id` int ,
      `notes` varchar(255),
      `submission_date` date
    );

    ALTER TABLE `student` ADD FOREIGN KEY (`batch_id`) REFERENCES `batch` (`id`);

    ALTER TABLE `student` ADD FOREIGN KEY (`project_id`) REFERENCES `project` (`id`);

    ALTER TABLE `supervisor_project` ADD FOREIGN KEY (`supervisor_id`) REFERENCES `supervisor` (`id`);

    ALTER TABLE `supervisor_project` ADD FOREIGN KEY (`project_id`) REFERENCES `project` (`id`);

    ALTER TABLE `supervisor_project` ADD UNIQUE (`project_id`, `supervisor_id`);

    ALTER TABLE `batch` ADD FOREIGN KEY (`program_id`) REFERENCES `program` (`id`);

    ALTER TABLE `batch_phase` ADD FOREIGN KEY (`batch_id`) REFERENCES `batch` (`id`);

    ALTER TABLE `batch_phase` ADD FOREIGN KEY (`phase_id`) REFERENCES `phase` (`id`);

    ALTER TABLE `project_tracking` ADD FOREIGN KEY (`project_id`) REFERENCES `project` (`id`);

    ALTER TABLE `project_tracking` ADD FOREIGN KEY (`phase_id`) REFERENCES `phase` (`id`);

    ALTER TABLE `project_tracking` ADD UNIQUE (`project_id`, `phase_id`);

    ALTER TABLE `project_tracking` ADD COLUMN `marks` int;
