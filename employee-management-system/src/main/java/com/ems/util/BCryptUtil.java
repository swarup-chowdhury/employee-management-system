package com.ems.util;
import org.mindrot.jbcrypt.BCrypt;
public final class BCryptUtil { private BCryptUtil(){} public static boolean matches(String raw,String hash){return raw!=null&&hash!=null&&BCrypt.checkpw(raw,hash);} public static String hash(String raw){return BCrypt.hashpw(raw,BCrypt.gensalt(12));} }
