INSERT INTO department (name)
VALUES 
  ('Sales'), 
  ('Engineering'), 
  ('Finance'), 
  ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES 
  ('Sales Lead', 100000, 1), 
  ('Salesperson', 80000, 1), 
  ('Lead Engineer', 150000, 2), 
  ('Software Engineer', 120000, 2), 
  ('Accountant', 125000, 3), 
  ('Legal Team Lead', 250000, 4), 
  ('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, 1),
  ('Virginia', 'Woolf', 1, 1),
  ('Piers', 'Gaveston', 1, NULL),
  ('Charles', 'LeRoi', 2, 1),
  ('Katherine', 'Mansfield', 2, 1),
  ('Dora', 'Carrington', 3, NULL),
  ('Edward', 'Bellamy', 3, NULL),
  ('Montague', 'Summers', 3, 1),
  ('Octavia', 'Butler', 3, 1),
  ('Unica', 'Zurn', 3, 1);