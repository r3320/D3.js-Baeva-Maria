$(document).ready(function(){
        $("#next").hide();
        $("#check-percent").hide();
        $("#container").hide();
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
            '<html>\n' +
            '<head>\n' +
            '\t<title>Result</title>\n' +
            '\t<style>\n' +
            '\t\t.chart div {\n' +
            '\t\t\tbackground-color: #3F51B5;\n' +
            '\t\t\ttext-align: right;\n' +
            '\t\t\tpadding: 3px;\n' +
            '\t\t\tmargin: 5px;\n' +
            '\t\t\tcolor: white;\n' +
            '\t\t}\n' +
            '\t</style>\n'+
            '</head>\n' +
            '<body>\n' +
            '\t<div class="chart"></div>\n' +
            '\t<script src="http://d3js.org/d3.v3.min.js"  charset="utf-8"><\/script>\n' +
            '</body>\n' +
            '</html>';
        
        var js1 = document.querySelector(".JS-editor1");
        var jsEditor1 = ace.edit(js1);
        jsEditor1.getSession().setMode("ace/mode/javascript");
        jsEditor1.setTheme("ace/theme/dreamwiaver"); 
        jsEditor1.setReadOnly(true); 
        jsEditor1.setValue(
            'var x = d3.scale.linear()\n' +
            '\t.domain([0, d3.max(data)])\n' +
            '\t.range([0, 420]);\n' +
            '\n' +
            'd3.select(".chart")\n' +
            '\t.selectAll("div")\n' +
            '\t.data(data)\n' +
            '\t.enter().append("div")\n' +
            '\t.style("width", function(d) { return x(d) + "px"; })\n' +
            '\t.text(function(d) { return d; });'
    );

        var js2 = document.querySelector(".JS-editor2");
        var jsEditor2 = ace.edit(js2);
        jsEditor2.getSession().setMode("ace/mode/javascript");
        jsEditor2.setTheme("ace/theme/dreamwiaver");  
        jsEditor2.setValue(
            'var data = [21, 21, 21, 21, 21, 21];');
                
        var resultFrame = document.getElementById("result-frame");
        var result_doc = resultFrame.contentDocument ||         resultFrame.contentWindow.document;
        
        var array = 'var data = [5, 17, 3, 11, 21, 14];';

        var sample_js =
            'var x = d3.scale.linear()\n' +
            '\t.domain([0, d3.max(data)])\n' +
            '\t.range([0, 420]);\n' +
            '\n' +
            'd3.select(".chart")\n' +
            '\t.selectAll("div")\n' +
            '\t.data(data)\n' +
            '\t.enter().append("div")\n' +
            '\t.style("width", function(d) { return x(d) + "px"; })\n' +
            '\t.text(function(d) { return d; });';
        var sample_frame = document.getElementById('sample-frame');
        var sample_doc = sample_frame.contentDocument || sample_frame.contentWindow.document;
        sample_doc.open();
        sample_doc.write(html_text + "<script>" + array + sample_js + "<\/script>");
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
                                $("#next").show();
//                                $("#elem").show();
                                $("#check-percent").show();
                                $("#container").show();
                                var percentage = (100 - Math.ceil(data.rawMisMatchPercentage))/100;
                                bar.animate(percentage);
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
//                                resembleControl2 = resemble(result_string).compareTo(sample_string).onComplete(onComplete);
                                resemble.outputSettings({
                                  errorColor: {
                                    red: 145,
                                    green: 0,
                                    blue: 0
                                  },
                                  errorType: 'flat',
                                  transparency: 0.3,
                                });
                                resembleControl.repaint();
                        })
                    }
                });
            }
        }); 
    }
    
    
    
    