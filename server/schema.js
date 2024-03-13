const createTables = {
    createUsersTable: () => {
      return `
        CREATE TABLE IF NOT EXISTS users (
          user_id INT(4) NOT NULL AUTO_INCREMENT,
          username VARCHAR(50) NOT NULL,
          password VARCHAR(100) NOT NULL,
          user_email VARCHAR(100) NOT NULL,
          user_firstname VARCHAR(100) NOT NULL,
          user_lastname VARCHAR(100) NOT NULL,
          PRIMARY KEY (user_id)
        )
      `;
    },
    
    createDepartmentsTable: () => {
      return `
        CREATE TABLE IF NOT EXISTS departments (
          dept_id INT(4) NOT NULL AUTO_INCREMENT,
          dept_name VARCHAR(30) NOT NULL,
          PRIMARY KEY (dept_id)
        )
      `;
    },
    
    createActivitysTable: () => {
      return `
        CREATE TABLE IF NOT EXISTS activitys (
          act_id INT(4) NOT NULL AUTO_INCREMENT,
          act_name VARCHAR(50) NOT NULL,
          datacontroller_firstname VARCHAR(50) NOT NULL,
          datacontroller_lastname VARCHAR(50) NOT NULL,
          datacontroller_email VARCHAR(50) NOT NULL,
          datacontroller_number VARCHAR(10) NOT NULL,
          recorder_firstname VARCHAR(50) NOT NULL,
          recorder_lastname VARCHAR(50) NOT NULL,
          dept_id INT(4) NOT NULL,
          dept_name VARCHAR(50) NOT NULL,
          dpo_firstname VARCHAR(50) NOT NULL,
          dpo_lastname VARCHAR(50) NOT NULL,
          dpo_contact_place VARCHAR(50) NOT NULL,
          dpo_email VARCHAR(50) NOT NULL,
          dpo_number VARCHAR(10) NOT NULL,
          recordreviewer_firstname VARCHAR(50) NOT NULL,
          recordreviewer_lastname VARCHAR(50) NOT NULL,
          PRIMARY KEY (act_id)
        )
      `;
    }
  };
  
  module.exports = createTables;
  