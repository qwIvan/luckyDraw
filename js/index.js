//抽奖人员名单
var allPerson = "邓豪;黄越;刘远鹏;郑权烽;陈宇豪;梁伟涛;吴志洪;范智威;李杰荣;黎梓健;吴森鑫;周灿荣;曾晓帆;张冠强;林依航;林晓涛;林;陈逸楷;王汀;段浪涛;刘钰城;邓;吴巧悦;陈颜;孔富江;陈鸣;郑小姐;刘平涛;刘培炎;黄先生;赖俊希;何钊懿;毛韶阳;张甫;张尚文;张巧滢;吴东发;邓报华;安静;叶在展;麦月克;葉孟良;黄伟峻;段正午;刘馨;梁焕辉;周靖杰;林祺沁;黄锐;宋春松;饶泰山;叶健毅;关宇;郭佑铭;Dev;舒金培;宋斌;赖柏宇;黄海燕;余勇圻;袁先生;陈锡鑫;钟世杰;吴远至;王怡博;赖乐淇;曾国涛;黄沛铧;冯;李德正;赖正火;林海吟;黄卓雄;苏辰志;何小姐;文明瑶;黄炎森;晓明;赵小吉;吴嘉骅;李志鹏;186****6311;莫;肖先生;韩玉玉;158****8965;李宜蓁;李子毅;樊顺;张志坚;张福财;曾淦;张林;庞文豪;吴明翰;周东平;张凯迪;陈生;Jack;欧阳泽佳;潘星培;潘宏远;李云熙;杨雯淇;刘小彤;尹沃康;张先生;刘澳秋;叶炜文;高伟峰;陈先生;王嘉伟;杨梦洁;范志豪;陈粤龙;Xeaon;赖锐;Henry;吴依玲;秦妮娜;欧阳安俏;刘媛媛;谢安琪;冯锵健;Sh;刘岩;莫馥全;黄俊鑫;戴泽升;潘鲁彤;梁景怡;钱建锋;庄红艳;黄春然;蔡翔宇;孟浩;孟涛;杨美志;石雨珉;梁峰;刘恒利;翟宇;张亮坤;许家欣";
//领导人员名单
var leaderArr = [];
//未中奖人员名单
var remainPerson = allPerson.toString().split(";");
//中奖人员名单
var luckyMan = [];
var timer;//定时器
var times = 1;//抽奖次数,如果不是第一次，不加粗显示领导姓名
$(function () {
    iconAnimation();
    //开始抽奖
    $("#btnStart").on("click", function () {
        //判断是开始还是结束
        if ($("#btnStart").text() === "开始") {
            if (!$("#txtNum").val()) {
                showDialog("请输入中奖人数");
                return false;
            }
            if ($("#txtNum").val() > 49) {
                showDialog("一次最多只能输入49人");
                return false;
            }
            if ($("#txtNum").val() > remainPerson.length) {
                showDialog("当前抽奖人数大于奖池总人数<br>当前抽奖人数：<b>" + $("#txtNum").val() + "</b>人,奖池人数：<b>" + remainPerson.length + "</b>人");
                return false;
            }
            $("#result").fadeOut();
            //显示动画框，隐藏中奖框
            $("#luckyDrawing").show().next().addClass("hide");
            move();
            $("#btnStart").text("停止");
            $("#bgLuckyDrawEnd").removeClass("bg");
        }
        else {
            $("#btnStart").text("开始");//设置按钮文本为开始
            var luckyDrawNum = $("#txtNum").val();
            startLuckDraw();//抽奖开始

            $("#luckyDrawing").fadeOut();
            clearInterval(timer);//停止输入框动画展示
            $("#luckyDrawing").val(luckyMan[luckyMan.length - 1]);//输入框显示最后一个中奖名字
            $("#result").fadeIn().find("div").removeClass().addClass("p" + luckyDrawNum);//隐藏输入框，显示中奖框
            $("#bgLuckyDrawEnd").addClass("bg");//添加中奖背景光辉
            $("#txtNum").attr("placeholder", "输入中奖人数(" + remainPerson.length + ")");
        }
    });

    $("#btnReset").on("click", function () {
        //确认重置对话框
        var confirmReset = false;
        showConfirm("确认重置吗？所有已中奖的人会重新回到抽奖池！", function () {
            //熏置未中奖人员名单
            remainPerson = allPerson.toString().split(";");
            //中奖人数框置空
            $("#txtNum").val("").attr("placeholder", "请输入中奖人数");
            $("#showName").val("");
            //隐藏中奖名单,然后显示抽奖框
            $("#result").fadeOut();//.prev().fadeIn()
            $("#bgLuckyDrawEnd").removeClass("bg");//移除背景光辉
            times++;
            console.log(times);

        });
    });
});

//抽奖主程序
function startLuckDraw() {
    //抽奖人数
    var luckyDrawNum = $("#txtNum").val();
    if (luckyDrawNum > remainPerson.length) {
        alert("抽奖人数大于奖池人数！请修改人数。或者点重置开始将新一轮抽奖！");
        return false;
    }
    //随机中奖人
    var randomPerson = getRandomArrayElements(remainPerson, luckyDrawNum);
    var tempHtml = "";
    $.each(randomPerson, function (i, person) {
        if (leaderArr.indexOf(person) > -1 && times == 1) {
            tempHtml += "<span><b>" + person + "</b></span>";
        }
        else {
            tempHtml += "<span>" + person + "</span>";
        }
    });
    $("#result>div").html(tempHtml);
    //剩余人数剔除已中奖名单
    remainPerson = remainPerson.delete(randomPerson);
    //中奖人员
    luckyMan = luckyMan.concat(randomPerson);
    //设置抽奖人数框数字为空
    $("#txtNum").val("");
}

//参考这篇文章：http://www.html-js.com/article/JS-rookie-rookie-learned-to-fly-in-a-moving-frame-beating-figures
//跳动的数字
function move() {
    var $showName = $("#showName"); //显示内容的input的ID
    var interTime = 30;//设置间隔时间
    timer = setInterval(function () {
        var i = GetRandomNum(0, remainPerson.length);
        $showName.val(remainPerson[i]);//输入框赋值
    }, interTime);
}

//顶上的小图标，随机动画
function iconAnimation() {
    var interTime = 200;//设置间隔时间
    var $icon = $("#iconDiv>span");
    var arrAnimatoin = ["bounce", "flash", "pulse", "rubberBand", "shake", "swing", "wobble", "tada"];
    var timer2 = setInterval(function () {
        var i = GetRandomNum(0, $icon.length);
        var j = GetRandomNum(0, arrAnimatoin.length);
        //console.log("i:" + i + ",j:" + j);
        $($icon[i]).removeClass().stop().addClass("animated " + arrAnimatoin[j]);//输入框赋值
    }, interTime);

}
