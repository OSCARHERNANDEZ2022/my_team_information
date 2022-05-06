const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

const render = (employees) => {
  const html = [];

  html.push(
    employees
      .filter((employee) => employee.getRole() === "Manager")
      .map((manager) => renderManager(manager))
  );
  html.push(
    employees
      .filter((employee) => employee.getRole() === "Lead")
      .map((lead) => renderLead(lead))
  );
  html.push(
    employees
      .filter((employee) => employee.getRole() === "Supervisor")
      .map((suprvisor) => renderSupervisor(supervisor))
  );

  return renderMain(html.flat().join(""));
};

const renderManager = (manager) => {
  let template = fs.readFileSync(
    path.resolve(templatesDir, "manager.html"),
    "utf8"
  );
  template = replacePlaceholders(template, "name", manager.getName());
  template = replacePlaceholders(template, "role", manager.getRole());
  template = replacePlaceholders(template, "email", manager.getEmail());
  template = replacePlaceholders(template, "id", manager.getId());
  template = replacePlaceholders(
    template,
    "officeNumber",
    manager.getOfficeNumber()
  );
  return template;
};

const renderLead = (lead) => {
  let template = fs.readFileSync(
    path.resolve(templatesDir, "lead.html"),
    "utf8"
  );
  template = replacePlaceholders(template, "name", lead.getName());
  template = replacePlaceholders(template, "role", lead.getRole());
  template = replacePlaceholders(template, "email", lead.getEmail());
  template = replacePlaceholders(template, "id", lead.getId());
  template = replacePlaceholders(
    template,
    "officeNumber",
    lead.getOfficeNumber()
  );
  return template;
};

const renderSupervisor = (suprvisor) => {
  let template = fs.readFileSync(
    path.resolve(templatesDir, "supervisor.html"),
    "utf8"
  );
  template = replacePlaceholders(template, "name", supervisor.getName());
  template = replacePlaceholders(template, "role", supervisor.getRole());
  template = replacePlaceholders(template, "email", supervisor.getEmail());
  template = replacePlaceholders(template, "id", supervisor.getId());
  template = replacePlaceholders(
    template,
    "officeNumber",
    supervisor.getOfficeNumber()
  );
  return template;
};

const renderMain = (html) => {
  const template = fs.readFileSync(
    path.resolve(templatesDir, "main.html"),
    "utf8"
  );
  return replacePlaceholders(template, "team", html);
};

const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = render;
