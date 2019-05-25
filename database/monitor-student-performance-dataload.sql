INSERT INTO program(`name`)
VALUES
   ('Bsc Computing 2 year degree'),
   ('Bsc Computing 3 year degree'),
   ('Bsc Computing including integrated foundation year'),
   ('Graduate diploma in computing'),
   ('Msc Applied Computing'),
   ('Msc Applied Data Science'),
   ('Msc Innovative Computing'),
   ('Msc Computing By Research'),
   ('Phd Computing');

INSERT INTO phase(`name`,`description`)
VALUES
    ('PE', 'Proposal - Ethical'),
    ('RV1', 'Report Version 1'),
    ('RV2', 'Report Version 2'),
    ('M', 'Meeting'),
    ('PRSN', 'Presentation'),
    ('PSTR', 'Poster'),
    ('DRP', 'Draft Report'),
    ('FRP', 'Final Report'),
    ('VIVA', 'Internal & External Viva');

INSERT INTO batch (`program_id`, `project_start_date`, `start_date`)
VALUES
    (4, '2019-03-22', '2019-01-22'),
    (2, '2019-02-22', '2018-01-22');


INSERT INTO batch_phase(`batch_id`, `phase_id`, `deadline_date`)
VALUES
  (1, 1, '2019-03-22'),
  (1, 2, '2019-04-22'),
  (1, 3, '2019-05-22'),
  (1, 4, '2019-06-22'),
  (1, 5, '2019-07-22'),
  (1, 6, '2019-08-22'),
  (1, 7, '2019-09-22'),
  (1, 8, '2019-10-22'),
  (1, 9, '2019-11-22');


INSERT INTO supervisor(`name`, `identification_number`)
VALUES
    ('Supervisor 1', '123456'),
    ('Supervisor 2', '234567'),
    ('Supervisor 3', '345678'),
    ('Supervisor 4', '456789');