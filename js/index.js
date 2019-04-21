//抽奖人员名单
var allPerson = "LoiNg;严霞;易彩燕;曾晓春;令狐;Diana;菲;谢沛妮;张宁;纪淑儿;蒋忠;彭莘昱;刘裕勋;Bryan;雅妮;陈少梦;梁浩梅;李颖磊;高骏;谢燕红;王红云;熊鹏昊;朱志斌;陳雲麗;余紫娟;薛娅;子沄;郑弯;Esther;王伟超;康诗怡;余悦圆;黄彩坚;李洽婷;Being;黎悟;徐进;陈雅楠;黄嘉嘉;庄景茹;王逸韬;曾子燕;蔡榕莹;刘少婉;范璐璐;王梓帆;黄丹丹;林琪;荣彬程;杨杰;邓舒柳;王伊晨;刘伟英;陈璜;陈雅萍;闫信月;林惠美;秦沾;蒋子云;苏娜;湛颖仪;付莉蓉;白宇潇;谢同学;陈同学;蓝翠;邱茜薇;陈小姐;李秋晓;林构锐;兜兜;汪水廷;郑皓沥;罗千姿;欧颖;何露;谢杜;蔡佳雯;吕坤;Ken;宋俊锦;戴桢;唐萍;古俊杰;曹敏;金新凯;肖金水;劳坤芳;叶永才;曹小姐;艾灵;刘霞;覃海婷;沐玉辰;张倩玉;薛杰文;陈政润;翁清铧;骆文慧;郑子铭;吕泽华;魏仲凯;林浩铌;肖礽;魏小婉;苏少萍;黄琦茵;范译方;谢永豪;杨琼玉;唐伟;路涛;李国明;杜晓彤;崔志敏;张朝凡;吴少;李孟菊;黄佳炫;翁蕾;庞诗琴;邓秋莹;刘润芸;欧蓝晰;薛妍;钟昕言;徐安琪;李慧敏;Joshion;Tammy;张嘉子;梁思健;吴;许生;He;钟萦雅;王晓璇;陈永凯;陈巧华;黄卓圆;左沁;林润熹;苏锦珠;雷国丽;ddd;关致聪;曾夫;孙启豪;田瑜琴;朱冬妹;尹智文;冯璐茜;肖丽娟;丘碧琳;韩巍;侯骅十;李盈;张洁欣;朱蓓蓓;黎月梅;农思梅;李蔼欣;谭玉麒;陈小丽;HunterKong;田;张晨阳;刘肖艳;聂献余;申海伟;jane;田红艳;黄绿茹;崔静君;姜瑜;庄;李木木;黎嘉莉;刘玲;李唯劼;KylieLam;周燕飞;陆锦;邵珂;徐婷婷;Anezka-张枫;宋玥明;崔苹苹;Max;邹敏;Alina;李汐;何若松;王其云;王青;王会斌;李爽爽;刘欢天;张昊;林华敏;吴瑞婷;罗霞;古月;叶卓尔;winner;卢泽煌;杨李杏;陈学声;Grace;罗欣怡;陈珑;殷晚玉;原健钏;黄卉;林威;招逸慧;冯慧玲;陈遥宇;覃晓露;戴观祺;余素霞;胡科;杨蒙;李宗霞;翁娟燕;郭嘉琳;张小姐;陈晓珊;谭芬芬;刘思淇;张杨童;王怡然;李诗贤;李岳;杨明玥;陈洁仪;文若昀;王艳萍;王冬;吴宝娟;王沙沙;姚诗雅;Dahong;张蜀宁;黎芳;黄春丽;晓晓;李燕;黄静仪;黄婉刁;许婷婷;魏女士;容显丽;谢红萍;陈奕安;李智荧;孙维;陈楚如;陈铭霓;黄晓彤;游美英;朱妍;杨安琪;蒙爷;梁敏;陈颖君;何艾茜;杨李君;何妙娴;杨富钧;马思敏;陈珊娜;古雅卉;黄志;钱秋何;蔡楚煜;Courtier;KelvinNg;EmmaWong;EmilyLeung;PeterLo;周欢;梁永健;梁俊丽;梁广胜;汤文辉;allen;肖敏;邓嘉荣;黄慧;文玟;何银喜;胡江伟;卫欣;杨震南;HelenPeng;李嘉楠;李泉霖Mark;张馨予;佘柠宇;梁晓源;梁国锋;梁益嵩";
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
