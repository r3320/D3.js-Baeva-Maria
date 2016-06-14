$(document).ready(function(){
        $("#next").hide();
        $("#check-percent").hide();
    });

var bar = new ProgressBar.Circle(container, {
  color: '#000',
  // This has to be the same size as the maximum width to
  // prevent clipping
  strokeWidth: 4,
  trailWidth: 1,
  easing: 'easeInOut',
  duration: 1400,
  text: {
    autoStyleContainer: false
  },
  from: { color: '#999', width: 1 },
  to: { color: '#159', width: 3 },
  // Set default step function for all animate calls
  step: function(state, circle) {
    circle.path.setAttribute('stroke', state.color);
    circle.path.setAttribute('stroke-width', state.width);

    var value = Math.round(circle.value() * 100);
    if (value === 0) {
      circle.setText('');
    } else {
      circle.setText(value + "%");
    }

  }
});

var html_text = '<!DOCTYPE html>\n' +
                '<html> \n' +
                '<head> \n' +
                '<meta charset="utf-8"> \n' +
                '<script src="http://d3js.org/d3.v3.min.js"> <\/script>\n' +
                '<body>\n ' +
                '</body> \n' +
                '</html>';
        
        var js1 = document.querySelector(".JS-editor1");
        var jsEditor1 = ace.edit(js1);
        jsEditor1.getSession().setMode("ace/mode/javascript");
        jsEditor1.setTheme("ace/theme/dreamwiaver"); 
        jsEditor1.setReadOnly(true); 
        jsEditor1.setValue(
                'var color = d3.scale.category20();\n' +
                '\n' +
                'var pie = d3.layout\n' +
                '\t.pie()\n' +
                '\t.sort(null)\n' +
                '\t.value(function(d) { return d.rate; });\n' +
                '\n' +
                'var svg = d3.select("body").append("svg")\n' +
                '\t.attr("class", "axis")\n' +
                '\t.attr("width", width)\n' +
                '\t.attr("height", height)\n' +
                '\t.append("g")\n' +
                '\t.attr("transform","translate(" +(width / 2) + "," + (height / 2 ) + ")");\n' +
                '\n' +
                'var g = svg.selectAll(".arc")\n' +
                '\t.data(pie(data))\n' +
                '\t.enter().append("g")\n' +
                '\t.attr("class", "arc");\n' +
                '\n' +
                'g.append("path")\n' +
                '\t.attr("d", arc)\n' +
                '\t.style("fill", function(d) { return color(d.data.browser); });'
    );

        var js2 = document.querySelector(".JS-editor2");
        var jsEditor2 = ace.edit(js2);
        jsEditor2.getSession().setMode("ace/mode/javascript");
        jsEditor2.setTheme("ace/theme/dreamwiaver");  
        jsEditor2.setValue(
            'var height = 240,\n' +
                '\twidth = 450,\n' +
                '\tdata=[\n' +
                '\t\t{browser: "Ириски", rate: 20},\n' +
                '\t\t{browser: "Леденцы", rate: 20},\n' +
                '\t\t{browser: "Мармелад", rate: 20},\n' +
                '\t\t{browser: "Пастила", rate: 20},\n' +
                '\t\t{browser: "Батончики", rate: 20}\n' +
                '\t];\n' +
                '\n' +
                'var radius = 120;\n' +
                '\n' +
                'var arc = d3.svg.arc()\n' +
                '\t.innerRadius(radius-100)\n' +
                '\t.outerRadius(radius);\n' 
                );
                
        var resultFrame = document.getElementById("result-frame");
        var result_doc = resultFrame.contentDocument ||         resultFrame.contentWindow.document;
        
        var sample_js =
            'var height = 240,\n' +
                'width = 450,\n' +
                'data=[\n' +
                '{browser: "Google Chrome", rate: 45},\n' +
                '{browser: "Firefox", rate: 15},\n' +
                '{browser: "Opera", rate: 25},\n' +
                '{browser: "Yandex Browser", rate: 5},\n' +
                '{browser: "Internet Explorer", rate: 10}\n' +
                '];\n' +
                'var color = d3.scale.category20();\n' +
                'var radius = 120;\n' +
                'var arc = d3.svg.arc()\n' +
                '.innerRadius(radius-60)\n' +
                '.outerRadius(radius);\n' +
                'var pie = d3.layout\n' +
                '.pie()\n' +
                '.sort(null)\n' +
                '.value(function(d) { return d.rate; });\n' +
                'var svg = d3.select("body").append("svg")\n' +
                '.attr("class", "axis")\n' +
                '.attr("width", width)\n' +
                '.attr("height", height)\n' +
                '.append("g")\n' +
                '.attr("transform","translate(" +(width / 2) + "," + (height / 2 ) + ")");\n' +
                'var g = svg.selectAll(".arc")\n' +
                '.data(pie(data))\n' +
                '.enter().append("g")\n' +
                '.attr("class", "arc");\n' +
                'g.append("path")\n' +
                '.attr("d", arc)\n' +
                '.style("fill", function(d) { return color(d.data.browser); });';
        var sample_frame = document.getElementById('sample-frame');
        var sample_doc = sample_frame.contentDocument || sample_frame.contentWindow.document;
        sample_doc.open();
        sample_doc.write(html_text + "<script>" + sample_js + "<\/script>");
        sample_doc.close();
        
        var element = document.getElementById("elem");
        var check = document.getElementById("checking");
        var percent = document.getElementById("check-percent");
        
    element.onclick = function() {
        result_doc.open();
        result_doc.write(html_text + "<script>" + jsEditor2.getValue() + "<\/script>" + "<script>" + jsEditor1.getValue() + "<\/script>");
        result_doc.close();  
  };

    check.onclick = function() {
        html2canvas(sample_doc.body, {
            onrendered: function (sample) {
                var sample_image = sample;
                var sample_string = sample_image.toDataURL("image/jpeg, 1.0");
                html2canvas(result_doc.body, {
                    onrendered: function (result) {
                        var result_image = result;
                        var result_string = result_image.toDataURL("image/jpeg, 1.0"); resemble(sample_string).compareTo(result_string).onComplete (function(data){
                            console.log(data);
                            if (data.rawMisMatchPercentage < 2) {
                                $("#elem").show();
                                $("#check-percent").show();
                                $("#container").show();
                                percent.innerHTML = "Поздравляю! Вы прошли курс!";
                                bar.animate(1.0);
                            } else {
                                $("#check-percent").show();
                                $("#container").show();
                                var percentage = (100 - Math.ceil(data.rawMisMatchPercentage))/100;
                                bar.animate(percentage);
                                }
                            
                                function onComplete(data){
                                        var time = Date.now();
                                        var diffImage = new Image();
                                        diffImage.src = data.getImageDataUrl();

                                        $('#diff').html(diffImage);

                                    }

                                resembleControl = resemble(sample_string).compareTo(result_string).onComplete(onComplete);
                                resemble.outputSettings({
                                  errorColor: {
                                    red: 145,
                                    green: 0,
                                    blue: 0
                                  },
                                  errorType: 'movement',
                                  transparency: 0.3,
                                });
                                resembleControl.repaint();
                        })
                    }
                });
            }
        }); 
    }
    
    
    
    