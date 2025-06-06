PGDMP      !                }            event_buddy    17.4    17.4 &    F           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            G           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            H           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            I           1262    20507    event_buddy    DATABASE     q   CREATE DATABASE event_buddy WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en-US';
    DROP DATABASE event_buddy;
                     postgres    false            �            1259    20529    bookings    TABLE     �   CREATE TABLE public.bookings (
    booking_id integer NOT NULL,
    seat_booked integer NOT NULL,
    status character varying(50) DEFAULT 'Active'::character varying NOT NULL,
    user_id integer,
    event_id integer
);
    DROP TABLE public.bookings;
       public         heap r       postgres    false            �            1259    20528    bookings_booking_id_seq    SEQUENCE     �   CREATE SEQUENCE public.bookings_booking_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.bookings_booking_id_seq;
       public               postgres    false    222            J           0    0    bookings_booking_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.bookings_booking_id_seq OWNED BY public.bookings.booking_id;
          public               postgres    false    221            �            1259    20537    events    TABLE     �  CREATE TABLE public.events (
    event_id integer NOT NULL,
    title character varying(255) NOT NULL,
    date date NOT NULL,
    start_time time without time zone NOT NULL,
    end_time time without time zone NOT NULL,
    description text NOT NULL,
    location character varying(255) NOT NULL,
    total_seats integer NOT NULL,
    available_seats integer NOT NULL,
    total_booked integer NOT NULL,
    image_path character varying NOT NULL,
    tags text
);
    DROP TABLE public.events;
       public         heap r       postgres    false            �            1259    20536    events_event_id_seq    SEQUENCE     �   CREATE SEQUENCE public.events_event_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.events_event_id_seq;
       public               postgres    false    224            K           0    0    events_event_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.events_event_id_seq OWNED BY public.events.event_id;
          public               postgres    false    223            �            1259    20509    roles    TABLE     �   CREATE TABLE public.roles (
    id integer NOT NULL,
    role_id integer NOT NULL,
    role_name character varying(50) NOT NULL
);
    DROP TABLE public.roles;
       public         heap r       postgres    false            �            1259    20508    roles_id_seq    SEQUENCE     �   CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.roles_id_seq;
       public               postgres    false    218            L           0    0    roles_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;
          public               postgres    false    217            �            1259    20520    users    TABLE     �   CREATE TABLE public.users (
    user_id integer NOT NULL,
    full_name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    role_id integer
);
    DROP TABLE public.users;
       public         heap r       postgres    false            �            1259    20519    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public               postgres    false    220            M           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public               postgres    false    219            �           2604    20532    bookings booking_id    DEFAULT     z   ALTER TABLE ONLY public.bookings ALTER COLUMN booking_id SET DEFAULT nextval('public.bookings_booking_id_seq'::regclass);
 B   ALTER TABLE public.bookings ALTER COLUMN booking_id DROP DEFAULT;
       public               postgres    false    222    221    222            �           2604    20540    events event_id    DEFAULT     r   ALTER TABLE ONLY public.events ALTER COLUMN event_id SET DEFAULT nextval('public.events_event_id_seq'::regclass);
 >   ALTER TABLE public.events ALTER COLUMN event_id DROP DEFAULT;
       public               postgres    false    223    224    224            �           2604    20512    roles id    DEFAULT     d   ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);
 7   ALTER TABLE public.roles ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    218    218            �           2604    20523    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public               postgres    false    219    220    220            A          0    20529    bookings 
   TABLE DATA           V   COPY public.bookings (booking_id, seat_booked, status, user_id, event_id) FROM stdin;
    public               postgres    false    222   .       C          0    20537    events 
   TABLE DATA           �   COPY public.events (event_id, title, date, start_time, end_time, description, location, total_seats, available_seats, total_booked, image_path, tags) FROM stdin;
    public               postgres    false    224   �.       =          0    20509    roles 
   TABLE DATA           7   COPY public.roles (id, role_id, role_name) FROM stdin;
    public               postgres    false    218   s5       ?          0    20520    users 
   TABLE DATA           M   COPY public.users (user_id, full_name, email, password, role_id) FROM stdin;
    public               postgres    false    220   �5       N           0    0    bookings_booking_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.bookings_booking_id_seq', 26, true);
          public               postgres    false    221            O           0    0    events_event_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.events_event_id_seq', 58, true);
          public               postgres    false    223            P           0    0    roles_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.roles_id_seq', 4, true);
          public               postgres    false    217            Q           0    0    users_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_user_id_seq', 4, true);
          public               postgres    false    219            �           2606    20544 %   events PK_1b77463a4487f09e798dffcb43a 
   CONSTRAINT     k   ALTER TABLE ONLY public.events
    ADD CONSTRAINT "PK_1b77463a4487f09e798dffcb43a" PRIMARY KEY (event_id);
 Q   ALTER TABLE ONLY public.events DROP CONSTRAINT "PK_1b77463a4487f09e798dffcb43a";
       public                 postgres    false    224            �           2606    20535 '   bookings PK_7ff0b5d1ab3fea22169440436f2 
   CONSTRAINT     o   ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT "PK_7ff0b5d1ab3fea22169440436f2" PRIMARY KEY (booking_id);
 S   ALTER TABLE ONLY public.bookings DROP CONSTRAINT "PK_7ff0b5d1ab3fea22169440436f2";
       public                 postgres    false    222            �           2606    20525 $   users PK_96aac72f1574b88752e9fb00089 
   CONSTRAINT     i   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY (user_id);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "PK_96aac72f1574b88752e9fb00089";
       public                 postgres    false    220            �           2606    20514 $   roles PK_c1433d71a4838793a49dcad46ab 
   CONSTRAINT     d   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.roles DROP CONSTRAINT "PK_c1433d71a4838793a49dcad46ab";
       public                 postgres    false    218            �           2606    20516 $   roles UQ_09f4c8130b54f35925588a37b6a 
   CONSTRAINT     d   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "UQ_09f4c8130b54f35925588a37b6a" UNIQUE (role_id);
 P   ALTER TABLE ONLY public.roles DROP CONSTRAINT "UQ_09f4c8130b54f35925588a37b6a";
       public                 postgres    false    218            �           2606    20527 $   users UQ_97672ac88f789774dd47f7c8be3 
   CONSTRAINT     b   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3";
       public                 postgres    false    220            �           2606    20518 $   roles UQ_ac35f51a0f17e3e1fe121126039 
   CONSTRAINT     f   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "UQ_ac35f51a0f17e3e1fe121126039" UNIQUE (role_name);
 P   ALTER TABLE ONLY public.roles DROP CONSTRAINT "UQ_ac35f51a0f17e3e1fe121126039";
       public                 postgres    false    218            �           2606    20550 '   bookings FK_64cd97487c5c42806458ab5520c    FK CONSTRAINT     �   ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT "FK_64cd97487c5c42806458ab5520c" FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE SET NULL;
 S   ALTER TABLE ONLY public.bookings DROP CONSTRAINT "FK_64cd97487c5c42806458ab5520c";
       public               postgres    false    4769    222    220            �           2606    20555 '   bookings FK_976c0fe23c870f914acd2378e4e    FK CONSTRAINT     �   ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT "FK_976c0fe23c870f914acd2378e4e" FOREIGN KEY (event_id) REFERENCES public.events(event_id) ON DELETE SET NULL;
 S   ALTER TABLE ONLY public.bookings DROP CONSTRAINT "FK_976c0fe23c870f914acd2378e4e";
       public               postgres    false    222    4775    224            �           2606    20545 $   users FK_a2cecd1a3531c0b041e29ba46e1    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE SET NULL;
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1";
       public               postgres    false    220    4763    218            A   p   x�eϽ
A�z�0r��ٟR|9����_A'����4�v^��sZ6��!7�\$��/��/x�BS�
8Ң�0;��BV(
�P�.���unۼ���� � ��M�      C   �  x���R�8ů����N[�｣�v/=а���TmՖb�X�cye���{�$M��U�en��
�qlY��|GG	S�7%7J�wB{7��͊�Ų�F�oJ�v�j��b�O=�9���o_K�GT���S�oo ����+-Eg<u�-�%N�[a�9�
�j5/�,xMݭ���%���@�dDQ5��p����K�p-_ւx�ָ�H�ts'3F����
7.T��fNy�t���u��-�BY�:����ok����K�,��g	��_ڕs����gU�����M,��֪]�wqu�~�w��в5��䪙��s��V�ƈ���D��N��E,z���Ã)�u�����| ��I��4��B4�@�R�.]�ƨ�F;.��R�y��/
l�Gi:����ݝ����,^�s��]Ԫ/ga��*;�C��X�q� �h�d!�Rt��A��<$. C�;U�f��������l^f�9-��T��G�KѸ�w�:��:��z~I)���a�w߉'�FY#�����hvdvG�����u�Ϣ������y�e/7�(u�[#��ƭ��ɋBtݏ`��|�0��Yp�G�!��չ�����,L��
n�����9]�l3'_SC?L�|����Vl)-N�-���S�,Μ=$jώ�Z	�C�F�����t4��-o�-��� �c�A��)*��mi�I�҂wb���W�KN)��,v�����F�����mV�u����QG�5o���,`/���'�V�7]�I����Ƈyk���5NX��"~����ܫ%�j����T�(A��@{�X�|�Zxs�ע�3���*5�F��F}q� ?g0Yk�y�`j���X�A i���Mb2X�l���,s��z�\{�<��[α�}���69 �F,���l�o��{i*z���n=�_��P����g�Q�;�1.� �(�ha�R�m��kQ�0}7c/�	��;ڼ����� 4�K����@54�8+�����(���Y���Ch 8���/�IO^��QZ�{d�	t��|�cE���kL-��_���f�.:O��k�����}�r� ���av�>~�}]ӕAM���݉{%Hq��8��.�^�+x�a^�<�C����P�5��Z�U��ty~��%�GQ��G�4�p)�6A$�a7g�s�<����(`��`,����,f,���X{7��{$mfk:3Ǔ��W��� ���l����;ۯg琦���Ѳ�
��Q��&�����HʶR8��Ue6�=�p��|�D>���I"�6�
���gk+��l���c�xnS�,�޶X��&�	��I���΅���qZt-�hu+�}=�>��q�W+-V��VK��Rh���WW'���t-��T]�U �\#�5<���_(���`�dX��)�9x����a�_
��v��O�1Z��k���^)�ؖ&�rF��������w�з�^�����~���Y
_-�FVD#�d���᝝S�9���X�{��y��|�#���wӣd-k�8v�_��'��7���2z�*c�7��2�%χ�P\Z���������xu�qE��x���@�B]�����$Mm���7��f!>G#@�yH�{���5o���Y���#��A���j�۽�~����� � <aj�X����Y NRj��(5aN�&IfI�X��A@��h9�dJ�Ӑ��g�W�GNN�5̳�%W��������E      =       x�3�4�-N-�2�4�tL�������� Ci3      ?   �   x�e�;�0  й=�3
7��I@
�$.�)�"�j�������0.�&'�G��n��Q�N(z�hk%�m��~:Ă�}��݉n2�n0ѩ��)?��'�K�x͑k h�=�L �������.�>ЭD7I蹰{GT(Ax��n>�:|Q�븛�/*��ه:     