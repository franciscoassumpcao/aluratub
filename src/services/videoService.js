import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = 'https://kkxvliujlhoftvqmcvuw.supabase.co';
const PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtreHZsaXVqbGhvZnR2cW1jdnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyNTMyNDgsImV4cCI6MTk4MzgyOTI0OH0.AbPnDs9hI41FIDQq5kbpsTcy-2FPIEE5WGmjxuSSm0I';
const supabase = createClient(PROJECT_URL,PUBLIC_KEY );

export function videoService() {
    return {
        getAllVideos() {
           return supabase.from("video")
                .select("*");
        }
    }
}