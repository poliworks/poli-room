
let url = "http://localhost:8181";
let integrations;
let permissionCounter = 1;

let insertIntegrationInTable = (integration, index) => {
  $("#integrations").append(
    `<tr class="integration integration${index}" data-toggle="collapse" data-target="permissions${index}">
       <td class="name-${index}">${integration.name?integration.name:""}</td>
       <td class="api-key-${index}">${integration['API-KEY'] ? integration['API-KEY']:""}</td>
       <td class="dev-${index}">${integration.dev?integration.dev:""}</td>
       <td class="dev-contact-${index}">${integration["dev_contact"]? integration["dev_contact"] :""}</td>
       <td class="link-${index}">${integration["link"]?integration["link"]:""}</td>
       <td><a class="edit_integration btn-flat waves-effect waves-purple" data-target="${index}"><i class="material-icons">mode_edit</i></a></td>
       <td><a class="delete_integration btn-flat waves-effect waves-purple right" data-target='${integration['API-KEY']}' data-id='${index}' href="#">&times</a></td>
    </tr>
    `
  )
  let permissions = integration.permissions;
  permissions.forEach((permission)=> {
    $("#integrations").append(`
      <tr class="permission permissions${index} collapsed">
        <td></td>
        <td colspan="2" class="method-permissions${index}">METHOD:  ${permission.method}</td>
        <td colspan="4" class="query-permissions${index}">QUERY:  ${permission.query}</td>
      </tr>`);
  });
}

let newPermissionField = (permissionId, permission) => {
  $(`#${permissionId}`).append(
    `
    <li>
      <div class="row valign-wrapper">Permissão:</div>
      <div class="row valign-wrapper">
        <div class="col s5">
          <div class="input-field">
            <input id="permission${permissionCounter}" type="text" value="${permission.method? permission.method : ''}">
            <label for="permission${permissionCounter}" class="${permission.method? 'active' : ''}">Method:[/clientes]</label>
          </div>
        </div>
        <div class="col s5">
          <div class="input-field">
            <input id="query-permission${permissionCounter}" type="text" value="${permission.query ? permission.query : '*'}">
            <label for="query-permission${permissionCounter}" class="active">Queries Parameters:[fields, name, ...][Separated by comma]</label>
          </div>
        </div>
        <div class="col s2">
          <a class="delete_permission" href="#"><span style="margin-left: 10px;">&times</span></a>
        </div>
      </div>
    </li>
    `
  )
}
$.ajax(url+'/admin/data')
  .done(function(data) {
    integrations = data;
    data.forEach((integration, integrationCounter) => {
      insertIntegrationInTable(integration, integrationCounter);
    })
  });
  let editTarget;
$("#integrations").on("click", ".edit_integration", function(e) {
  editTarget = $(this).data("target");
  let integration = integrations[editTarget];
  console.log(integrations[editTarget]);
  $("#edit-name").val(integration.name);
  $("label[for='edit-name']").addClass(integration.name ? "active" : "");
  $("#edit-apvk").val(integration.apvk);
  $("label[for='edit-apvk']").addClass(integration.apvk ? "active" : "");
  $("#edit-dev").val(integration.dev);
  $("label[for='edit-dev']").addClass(integration.dev ? "active" : "");
  $("#edit-dev-contact").val(integration['dev_contact']);
  $("label[for='edit-dev-contact']").addClass(integration['dev_contact'] ? "active" : "");
  $("#edit-link").val(integration.link);
  $("label[for='edit-link']").addClass(integration.link ? "active" : "");
  integration.permissions.forEach((permission) => {
    newPermissionField("edit-permissions", permission);
    permissionCounter++;
  });
  $("#edit-modal").openModal();
});
$('#edit-add-permission').click(function() {
  newPermissionField("edit-permissions");
  permissionCounter++;
});
$("#add-permission").click(function() {
  newPermissionField("permissions", {"method":"", "query": "*"})

  permissionCounter++;
});
$("#integrations").on("click", ".integration", function(e) {
  if($(this)[0] != $(".selected")[0]){
    $(`.${$(".selected").data("target")}`).toggleClass("collapsed");
    $(".selected").toggleClass("selected")
  }
  $(this).toggleClass("selected");
  $(`.${e.currentTarget.dataset.target}`).toggleClass("collapsed");
});
$("#integrations").on("click", ".delete_integration", function(e){
  console.log(e.target.attributes['data-id']);
  console.log(`.permissions${e.target.attributes['data-id'].value}`);
  $(`.permissions${e.target.attributes['data-id'].value}`).remove();
  e.target.closest("tr").remove();
  $.ajax({
    url: url+`/admin/delete/${e.target.attributes['data-target'].value}`,
    method: "DELETE"
  })
});
$("#permissions, #edit-permissions").on("click", ".delete_permission", function(e){
  console.log(e.target.closest("li"));
  e.target.closest("li").remove();
});
$("#edit-integration").click(function(){
  let integration = {
    "name": $("#edit-name").val(),
    "dev":$("#edit-dev").val(),
    "dev_contact": $("#edit-dev-contact").val(),
    "apvk": $("#edit-apvk").val(),
    "link": $("#edit-link").val(),
    "permissions": []
  }
  let permissions = $("#edit-permissions").find("li");
  console.log(permissions);
  for(let i = 0; i < permissions.length; i++) {
    let perm = {}
    perm.method = $(permissions[i]).find('input')[0].value;
    perm.query = $(permissions[i]).find('input')[1].value;
    integration.permissions.push(perm);
  }
  console.log(JSON.stringify(integration));
  $.ajax(`${url}/admin/edit_integration/${integrations[editTarget]._id}`, {
    method: "PUT",
    dataType: "json",
    contentType: "application/json; charset=UTF",
    data: JSON.stringify(integration)
  }).done(function(data) {
    if(data.success) {
      $(`.name-${editTarget}`).html(integration.name);
      $(`.dev-${editTarget}`).html(integration.dev);
      $(`.dev-contact-${editTarget}`).html(integration.dev_contact);
      $(`.apvk-${editTarget}`).html(integration.apvk);
      $(`.link-${editTarget}`).html(integration.link);
      $(`.permissions${editTarget}`).each(function(index) {
        console.log($(this).find(`method-permissions${editTarget}`));
        $(this).find(`.method-permissions${editTarget}`).html(integration.permissions[index].method);
        $(this).find(`.query-permissions${editTarget}`).html(integration.permissions[index].query);
      });
      $("#edit-name").val("");
      $("#edit-dev").val("")
      $("#edit-dev-contact").val("")
      $("#edit-apvk").val("")
      $("#edit-link").val("")
      $('#edit-modal').closeModal();
    }
  });
});
$("#new-integration").click(function(){
  let integration = {
    "name": $("#name").val(),
    "dev":$("#dev").val(),
    "apvk": $("#apvk").val(),
    "dev_contact": $("#dev-contact").val(),
    "link": $("#link").val(),
    "permissions": []
  }
  let permissions = $("#permissions").find("li");
  console.log(permissions);
  for(let i = 0; i < permissions.length; i++) {
    let perm = {}
    console.log($(permissions[i]));
    perm.method = $(permissions[i]).find('input')[0].value;
    perm.query = $(permissions[i]).find('input')[1].value;
    console.log(perm);
    integration.permissions.push(perm);
  }
  console.log(integration);
  console.log(JSON.stringify(integration));
  let str = JSON.stringify(integration)
  $.ajax(url+"/admin/new_integration", {
    method: "POST",
    dataType: "json",
    contentType: "application/json; charset=UTF",
    data: str
  }).done(function(data) {
    if(data.success) {
      console.log(data);
      integration['API-KEY'] = data['API-KEY'];
      integration['_id'] = data['_id'];
      insertIntegrationInTable(integration, integrations.length);
      integrations.push(integration);
      $('#new-modal').closeModal();
    } else console.log("not success");
  })
});
$(document).ready(function(){
  $('.modal-trigger').leanModal();
});
