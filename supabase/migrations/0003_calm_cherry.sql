-- Update organization policies
CREATE POLICY "Enable insert for authenticated users only"
ON public.organizations
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users"
ON public.organizations
FOR SELECT
TO authenticated
USING (true);

-- Update team policies
CREATE POLICY "Enable insert for authenticated users only"
ON public.teams
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users"
ON public.teams
FOR SELECT
TO authenticated
USING (true);

-- Update member policies
CREATE POLICY "Enable insert for authenticated users only"
ON public.members
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users"
ON public.members
FOR SELECT
TO authenticated
USING (true);