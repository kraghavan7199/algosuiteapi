CREATE SCHEMA auth;
CREATE SCHEMA strings;
CREATE SCHEMA tree;

CREATE TABLE auth.users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_role VARCHAR(1),
    blocked boolean,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
	
CREATE TABLE strings.UserSubstringAnalysis (
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES auth.users(id) ON DELETE CASCADE,
    input_string TEXT NOT NULL,
    longest_substring_length INTEGER NOT NULL,
    unique_substrings TEXT[] NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE strings.words (
    id SERIAL PRIMARY KEY,
    word TEXT NOT NULL
);

CREATE TABLE tree.UserTree (
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES auth.users(id) ON DELETE CASCADE,
	tree jsonb,
    maxsumpath jsonb,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE OR REPLACE FUNCTION strings.addsubstringdata(
	_string text,
	_longest_substring_length integer,
	_unique_substrings text[],
	_userid integer
)
    RETURNS VOID
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE 
AS $BODY$
BEGIN
	
	INSERT INTO strings.UserSubstringAnalysis (input_string, longest_substring_length, unique_substrings, user_id) VALUES 
	                                         (_string, _longest_substring_length, _unique_substrings, _userid);
											 

END;
$BODY$;




CREATE OR REPLACE FUNCTION tree.addtree(
	_tree jsonb,
	_userid integer,
	_maxsumpath jsonb)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
BEGIN

    IF _tree IS NULL THEN
        DELETE FROM tree.UserTree WHERE user_id = _userid;
    ELSE

        INSERT INTO tree.UserTree (tree, user_id, maxsumpath)
        VALUES (_tree, _userid, _maxsumpath)
        ON CONFLICT (user_id)
        DO UPDATE 
        SET tree = EXCLUDED.tree, maxsumpath = EXCLUDED.maxsumpath;
    END IF;
END;
$BODY$;





CREATE INDEX idx_words ON strings.words USING gin (to_tsvector('english', word));

ALTER TABLE tree.usertree ADD CONSTRAINT unique_user_tree UNIQUE (user_id);




CREATE OR REPLACE FUNCTION auth.getuserdata()
    RETURNS TABLE (count_users integer, count_strings integer, count_trees integer)
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
BEGIN

	RETURN QUERY SELECT 
    (SELECT COUNT(DISTINCT id) FROM auth.users WHERE role = 'user') AS count_users,
    (SELECT COUNT(DISTINCT input_string) FROM strings.usersubstringanalysis) AS count_strings,
    (SELECT COUNT(id) FROM tree.usertree) AS count_trees;

END;
$BODY$;

