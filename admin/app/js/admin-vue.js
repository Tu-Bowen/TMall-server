// header
Vue.component('admin-header', {
    template: '#admin-header',
    props: {
        title: [String],
        system_list: [Array],
        user_menus: [Array]
    },
    data: function () {
        return {
            search_text: ''
        }
    },
    methods: {
        //���¼��ύ�������
        sys_switch: function (sys) {
            this.title = sys.title;
            this.$emit('click_sys_switch', sys)
        },
        search: function () {
            this.$emit('click_search', this.search_text)
        }
    }
})
//main
Vue.component('admin-main', {
    template: '#admin-main',
    props: {
        user: [Object],
        user_menus: [Array],
        menus: [Array],
    },
    methods: {
        //���¼��ύ�������
        open_tab: function (title, url) {
            this.$emit('click_open_tab', title, url);
        }
    }
})

//sidebar
Vue.component('admin-sidebar', {
    template: '#admin-sidebar',
    props: {
        user: [Object],
        user_menus: [Array],
        menus: [Array]
    },
    methods: {
        //���¼��ύ�������
        open_tab: function (menu) {
            this.$emit('open_tab', menu.title, menu.url);
        }
    }
})

var data = {
    system_skin: 'skin-green',
    //header
    system_title: 'Ȩ�޹���ϵͳ',
    //system_list.name��Ӧ��������
    system_list: [
        {id: '1', skin: 'skin-green', title: 'Ȩ�޹���ϵͳ', icon: 'zmdi-shield-security'},
        {id: '2', skin: 'skin-dark-blue', title: '���ݹ���ϵͳ', icon: 'zmdi-wikipedia'},
        {id: '3', skin: 'skin-pink', title: '֧������ϵͳ', icon: 'zmdi-paypal-alt'},
        {id: '4', skin: 'skin-purple', title: '�û�����ϵͳ', icon: 'zmdi-account'},
        {id: '5', skin: 'skin-blue', title: '�洢����ϵͳ', icon: 'zmdi-cloud'},
    ],
    //main
    user_menus: [
        {title: '��������', icon: 'zmdi-account', url: '', isOpenTab: true},
        {title: '��˽����', icon: 'zmdi-face', url: '', isOpenTab: true},
        {title: '�˳���¼', icon: 'zmdi-run', url: 'logout', isOpenTab: false}
    ],
    user: {
        avater: 'app/img/avatar.jpg',
        name: 'bloom'
    },
    menus: [
        {title: '��ҳ', icon: 'zmdi-home', url: 'home', isOpenTab: true},
        {
            title: 'ϵͳ��֯����', icon: 'zmdi-accounts-list', children: [
            {title: 'ϵͳ����', icon: 'zmdi-account', url: 'crud.html', isOpenTab: true}
        ]
        },
        {
            title: ' ��ɫ�û�����', icon: 'zmdi-accounts', children: [
            {title: '�û�����', icon: '', url: 'page/sys/user/table.html', isOpenTab: true},
            {title: '��ɫ����', icon: '', url: 'page/sys/role/table.html', isOpenTab: true}
        ]
        },
        {
            title: ' Ȩ����Դ����', icon: 'zmdi-lock-outline', children: [
            {title: 'Ȩ�޹���', icon: '', url: 'page/sys/menu/menus.html', isOpenTab: true},
        ]
        },
        {
            title: '�������ݹ���', icon: 'zmdi-more', children: [
            {title: '�ٶ�', icon: 'zmdi-lock-outline', url: 'https://www.baidu.com/', isOpenTab: true},
        ]
        }
    ]
}


var vue = new Vue({
    el: '#app',
    data: data,
    methods: {
        sys_switch: function (sys) {// �л�ϵͳ
            $.cookie('bloom-skin-name', sys.skin);
            $.cookie('bloom-system-title', sys.title);
            $.cookie('bloom-system-id', sys.id);
            this.system_title = sys.title;
            this.system_skin = sys.skin;
            $('title').text(sys.title);
        },
        search: function (q) {
            console.log(q);
        },
        open_tab: function (title, url) {
            console.log(title, url)
            Tab.addTab(title, url)
        }
    }
})