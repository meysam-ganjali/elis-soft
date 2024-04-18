//? Receiving Information from File
const GetData = () => {
  //! Method
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  //! Send Request in Server
  fetch("http://127.0.0.1:5500/assets/data/data.json", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return HtmlData(JSON.parse(result).course);
    })
    .catch((error) => console.log("error", error));
};
//TODO Receiving information and converting it to HTML=>(LI || P) (child)
const RenderItemSubGroup = (data) => {
  var itemArray = ``;
  var num = 1;
  if (data.length > 1) {
    for (var i = 0; i < data.length; i++) {
      itemArray += `<!-- subGroup ${num} -->
          <li class="list-group-item list-group-item-action">
             ${data[i]}
              </li>`;
      num++;
    }
    itemArray = `
          <ul class="list-group px-0 w-100">
           ${itemArray}
          </ul>
          `;
  } else
    itemArray = `<!-- subGroup ${num} -->
          <p class="list-group-item list-group-item-action">
             ${data[0]}
              </p>`;
  return itemArray;
};
//TODO Receiving information and converting it to HTML (Parent)
const RenderItem = (data) => {
  var resultData = ``,
    resultDataItem = ``,
    resultSeason = ``,
    resultRenderHTml = ``;
  var subGroupCode = 1,
    categorySeason = 0,
    season = 0,
    category = 1;
  for (var languageIndex = 0; languageIndex < data.length; languageIndex++) {
    //? Ready Course
    for (
      var subItemIndex = 0;
      subItemIndex < data[languageIndex].subItem.length;
      subItemIndex++
    ) {
      //? Ready Sub Items Course
      for (
        var seasonIndex = 0;
        seasonIndex < data[languageIndex].subItem[subItemIndex].seasons.length;
        seasonIndex++
      ) {
        //? Ready Seasons Course
        data[languageIndex].subItem[subItemIndex].seasons[
          seasonIndex
        ].season.map((item) => {
          //? Loop On Data
          var attr = `onclick="toggleDescription('subGroup${subGroupCode}','headingOne${subGroupCode}')"`;
          resultDataItem += `
              <!--? item ${subGroupCode} -->
              <li class="list-group-item accordion-item list-group-item-action">
                      <h2 class="accordion-header" id="headingOne${subGroupCode}">
                          ${
                            item.subGroup != null
                              ? `
                          <a class="accordion-button collapsed text-center"
                              data-bs-toggle="collapse" ${attr} href="#subGroup${subGroupCode}" data-bs-target="#subGroup${subGroupCode}"
                              role="button" aria-expanded="true" aria-controls="subGroup${subGroupCode}">
                              ${item.titleGroupItem}
                          </a>`
                              : `<a class="btn accordion-button accordion-button-empty text-center" role="button" href="#">
                              ${item.titleGroupItem}
                          </a>`
                          }
                      </h2>
                      ${
                        item.subGroup != null
                          ? `<div class="collapse accordion-collapse d-md-none" aria-labelledby="subGroup${subGroupCode}" id="subGroup${subGroupCode}">
                          <div class="accordion-body">
                              ${RenderItemSubGroup(item.subGroup)}
                           </div>
                      </div>`
                          : ""
                      }
               </li>
         `;
          subGroupCode++;
        });
        resultSeason += `
                              <div class="accordion-item">
                                  <h2 class="accordion-header">
                                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                          data-bs-target="#season${season}" aria-expanded="true"
                                          aria-controls="season${season}">
                                          ${data[languageIndex].subItem[subItemIndex].seasons[seasonIndex].title}
                                      </button>
                                  </h2>
                                  <div id="season${season}" class="accordion-collapse collapse"
                                      data-bs-parent="#categorySeason${categorySeason}">
                                      <div class="accordion-body">
                                         <ul class="list-group px-0 w-100">
                                            ${resultDataItem}
                                         </ul>
                                      </div>
                                  </div>
                              </div>
                  `;
        season++;
        resultDataItem = ``;
      }

      resultData += `
              <div class="pe-md-5 py-1">
                 <button class="btn btnGroupCours me-md-4" type="button" onclick="toggleDescription('remove_Class_Show')" data-bs-toggle="collapse"
                         data-bs-target="#${
                           data[languageIndex].titleCourse +
                           data[languageIndex].subItem[subItemIndex].level
                         }" aria-expanded="true" aria-controls="${
        data[languageIndex].titleCourse + data[languageIndex].level
      }">
                     ${data[languageIndex].subItem[subItemIndex].title}
               </button>
             </div>
            <div>
                 <div class="collapse" data-bs-parent="#course${
                   data[languageIndex].titleCourse
                 }" id="${
        data[languageIndex].titleCourse +
        data[languageIndex].subItem[subItemIndex].level
      }">
                      <div class="card card-body accordion p-0 groupCardCourse">
                          <div class="accordion" id="categorySeason${categorySeason}">
                              ${resultSeason}
                          </div>
                      </div>
                  </div>
             </div> `;
      categorySeason++;
      resultSeason = ``;
    }
    resultRenderHTml += `
          <section id="parentCourse${data[languageIndex].titleCourse}">
              <div class="d-flex align-items-center">
          <!-- item logo(${data[languageIndex].language}) -->
          <button onclick="showOnlyOneCourse('parentCourse${data[languageIndex].titleCourse}')" class="btn btn-transparent d-flex justify-content-center align-items-center hover-scale-minus"
              type="button" data-bs-toggle="collapse" data-bs-target="#course${data[languageIndex].titleCourse}" aria-expanded="true"
              aria-controls="course${data[languageIndex].titleCourse}">
              ${data[languageIndex].logo}
          </button>
${data[languageIndex].titleCoursePersian}
      </div>
      <!-- category ${category} -->
      <div class="collapse" id="course${data[languageIndex].titleCourse}">
          <div class="card card-body bg-transparent px-0 pt-0 pt-md-3 px-md-4">${resultData}
      
      </div>
      </div>
          </section>
          `;
    category++;
    resultData = ``;
  }
  //! Send Data
  return resultRenderHTml;
};
//TODO Render Data Html
const RenderHtml = (html) => {
  document
    .querySelector("#viewCourse")
    .append(document.createRange().createContextualFragment(html));
};
//TODO: Send HTML data to render data in the current document
const HtmlData = (data) => {
  return RenderHtml(RenderItem(data));
};
//? start render ui in js
const showOnlyOneCourse = (id) => {
  var notHide = document.querySelector("#" + id).classList;
  var hiddenSections = document.querySelectorAll(
    `.home-center section:not(#${id})`
  );
  if (notHide.length > 0) {
    notHide.remove("notHid");
    hiddenSections.forEach((item) => {
      item.classList.remove("hid");
      item.classList.remove("notHid");
    });
  } else {
    notHide.add("notHid");
    hiddenSections.forEach((item) => {
      item.classList.add("hid");
    });
  }
  toggleDescription("remove_Class_Show");
};
const toggleDescription = (id, code) => {
  var box_description = document.querySelector(".box-description");
  var data_code = box_description.getAttribute("data-code");
  if (data_code != null && data_code != "") {
    var change_class_button = document.querySelector(
      `#${data_code} .accordion-button`
    );
    var select_element = document.querySelector(`#${code} .accordion-button`);
    switch (box_description.classList.contains("show")) {
      case true: {
        change_class_button.classList.add("collapsed");
        if (data_code != code && id !== "remove_Class_Show") {
          select_element.classList.remove("collapsed");
        }
        break;
      }
      case false: {
        if (data_code == code)
          change_class_button.classList.remove("collapsed");
        else if (id !== "remove_Class_Show")
          select_element.classList.remove("collapsed");
        break;
      }
    }

    box_description.setAttribute("data-code", code);
  } else {
    box_description.setAttribute("data-code", code);
  }
  if (id !== "remove_Class_Show") {
    var accordion_body = document.querySelector(`#${id} .accordion-body`);
    if (box_description.innerHTML == accordion_body.innerHTML) {
      box_description.classList.toggle("show");
    } else {
      box_description.innerHTML = accordion_body.innerHTML;
      if (!box_description.classList.contains("show"))
        box_description.classList.add("show");
    }
  } else if (box_description.classList.contains("show"))
    box_description.classList.remove("show");
};
//? end render ui in js
//* auto run function in get data
(function documentRady() {
  GetData();
})();
